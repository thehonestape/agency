#!/usr/bin/env node

/**
 * Database Migration Script
 *
 * This script automates applying SQL migrations to the Supabase database.
 * It parses SQL files in the docs/database directory and applies them either
 * locally or to the remote database based on command line arguments.
 *
 * Usage:
 *   node run-migrations.js [--remote] [--local] [--print]
 *
 * Options:
 *   --remote: Apply migrations to the remote Supabase instance
 *   --local: Apply migrations to a local Supabase instance
 *   --print: Just print the SQL statements without executing them
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Directory containing migration files
const MIGRATIONS_DIR = path.join(__dirname, '..', 'docs', 'database');

// Parse command line arguments
const args = process.argv.slice(2);
const isRemote = args.includes('--remote');
const isLocal = args.includes('--local');
const isPrint = args.includes('--print');

if (!isRemote && !isLocal && !isPrint) {
  console.error('Error: You must specify --remote, --local, or --print');
  console.log('Usage: node run-migrations.js [--remote] [--local] [--print]');
  process.exit(1);
}

// Create readline interface for user confirmation
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Get all SQL migration files
async function getMigrationFiles() {
  try {
    const files = fs
      .readdirSync(MIGRATIONS_DIR)
      .filter((file) => file.endsWith('.sql'))
      .sort(); // Sort alphabetically to ensure order

    return files;
  } catch (error) {
    console.error('Error reading migration files:', error);
    process.exit(1);
  }
}

// Read SQL content from a migration file
function readMigrationFile(filename) {
  try {
    return fs.readFileSync(path.join(MIGRATIONS_DIR, filename), 'utf8');
  } catch (error) {
    console.error(`Error reading migration file ${filename}:`, error);
    return null;
  }
}

// Apply migrations to remote Supabase
async function applyRemoteMigrations(files) {
  console.log('Applying migrations to remote Supabase...');

  for (const file of files) {
    console.log(`\nProcessing: ${file}`);
    const sql = readMigrationFile(file);

    if (!sql) continue;

    console.log('SQL content:');
    console.log('----------------------------------------');
    console.log(sql.slice(0, 300) + (sql.length > 300 ? '...' : ''));
    console.log('----------------------------------------');

    await new Promise((resolve) => {
      rl.question(`Apply this migration? (y/n) `, (answer) => {
        if (answer.toLowerCase() === 'y') {
          try {
            // Save SQL to a temporary file
            const tempFile = path.join(__dirname, 'temp-migration.sql');
            fs.writeFileSync(tempFile, sql);

            // Run the migration using Supabase CLI
            console.log('Executing...');
            execSync(`supabase db push --db-url ${process.env.SUPABASE_DB_URL} -f ${tempFile}`, {
              stdio: 'inherit',
            });

            // Clean up temp file
            fs.unlinkSync(tempFile);
            console.log(`✅ Successfully applied migration: ${file}`);
          } catch (error) {
            console.error(`❌ Error applying migration ${file}:`, error.message);
          }
        } else {
          console.log(`⏭️  Skipped migration: ${file}`);
        }
        resolve();
      });
    });
  }
}

// Apply migrations to local Supabase
async function applyLocalMigrations(files) {
  console.log('Applying migrations to local Supabase...');

  for (const file of files) {
    console.log(`\nProcessing: ${file}`);
    const sql = readMigrationFile(file);

    if (!sql) continue;

    console.log('SQL content:');
    console.log('----------------------------------------');
    console.log(sql.slice(0, 300) + (sql.length > 300 ? '...' : ''));
    console.log('----------------------------------------');

    await new Promise((resolve) => {
      rl.question(`Apply this migration? (y/n) `, (answer) => {
        if (answer.toLowerCase() === 'y') {
          try {
            // Save SQL to a temporary file
            const tempFile = path.join(__dirname, 'temp-migration.sql');
            fs.writeFileSync(tempFile, sql);

            // Run the migration using Supabase CLI for local instance
            console.log('Executing...');
            execSync(`supabase db push -f ${tempFile}`, { stdio: 'inherit' });

            // Clean up temp file
            fs.unlinkSync(tempFile);
            console.log(`✅ Successfully applied migration: ${file}`);
          } catch (error) {
            console.error(`❌ Error applying migration ${file}:`, error.message);
          }
        } else {
          console.log(`⏭️  Skipped migration: ${file}`);
        }
        resolve();
      });
    });
  }
}

// Just print migration files without executing
async function printMigrations(files) {
  console.log('Printing all migrations:');

  for (const file of files) {
    console.log(`\n===== ${file} =====`);
    const sql = readMigrationFile(file);

    if (sql) {
      console.log(sql);
    }
  }
}

// Main function
async function main() {
  try {
    const files = await getMigrationFiles();

    if (files.length === 0) {
      console.log('No migration files found.');
      rl.close();
      return;
    }

    console.log(`Found ${files.length} migration files:`);
    files.forEach((file) => console.log(`- ${file}`));

    if (isPrint) {
      await printMigrations(files);
    } else if (isRemote) {
      await applyRemoteMigrations(files);
    } else if (isLocal) {
      await applyLocalMigrations(files);
    }

    rl.close();
  } catch (error) {
    console.error('Error:', error);
    rl.close();
    process.exit(1);
  }
}

// Run the main function
main();
