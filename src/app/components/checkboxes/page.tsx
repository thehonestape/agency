'use client'

import React from 'react'
import { SimpleCheckbox, CheckboxGroup } from '@/components/forms/checkboxes'

export default function CheckboxesShowcase() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Checkboxes</h1>
      <p className="text-gray-600 mb-10">Form checkbox components for user selections and preferences</p>
      
      <div className="space-y-12">
        {/* Simple Checkbox */}
        <section>
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">Simple Checkbox</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Default</h3>
              <SimpleCheckbox
                label="Email notifications"
                id="email-notifications"
                name="email-notifications"
                description="Get notified when someone mentions you in a comment."
              />
              
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Example Code</h4>
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<SimpleCheckbox
  label="Email notifications"
  id="email-notifications"
  name="email-notifications"
  description="Get notified when someone mentions you in a comment."
/>`}
                </pre>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">With Error</h3>
              <SimpleCheckbox
                label="Accept terms and conditions"
                id="terms"
                name="terms"
                error="You must accept the terms to continue"
              />
              
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Example Code</h4>
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<SimpleCheckbox
  label="Accept terms and conditions"
  id="terms"
  name="terms"
  error="You must accept the terms to continue"
/>`}
                </pre>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Checked State</h3>
              <SimpleCheckbox
                label="Remember me"
                id="remember"
                name="remember"
                defaultChecked={true}
              />
              
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Example Code</h4>
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<SimpleCheckbox
  label="Remember me"
  id="remember"
  name="remember"
  defaultChecked={true}
/>`}
                </pre>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Disabled State</h3>
              <SimpleCheckbox
                label="Premium feature (upgrade required)"
                id="premium"
                name="premium"
                disabled={true}
                description="This feature is only available for premium users."
              />
              
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Example Code</h4>
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<SimpleCheckbox
  label="Premium feature (upgrade required)"
  id="premium"
  name="premium"
  disabled={true}
  description="This feature is only available for premium users."
/>`}
                </pre>
              </div>
            </div>
          </div>
        </section>
        
        {/* Checkbox Group */}
        <section>
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">Checkbox Group</h2>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Default</h3>
            <CheckboxGroup
              legend="Notification Preferences"
              options={[
                {
                  id: "comments",
                  label: "Comments",
                  description: "Get notified when someone comments on your post.",
                  value: "comments"
                },
                {
                  id: "mentions",
                  label: "Mentions",
                  description: "Get notified when someone mentions you.",
                  value: "mentions"
                },
                {
                  id: "follows",
                  label: "Follows",
                  description: "Get notified when someone follows you.",
                  value: "follows"
                }
              ]}
              defaultSelected={["comments"]}
            />
            
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-semibold mb-2">Example Code</h4>
              <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<CheckboxGroup
  legend="Notification Preferences"
  options={[
    {
      id: "comments",
      label: "Comments",
      description: "Get notified when someone comments on your post.",
      value: "comments"
    },
    {
      id: "mentions",
      label: "Mentions",
      description: "Get notified when someone mentions you.",
      value: "mentions"
    },
    {
      id: "follows",
      label: "Follows",
      description: "Get notified when someone follows you.",
      value: "follows"
    }
  ]}
  defaultSelected={["comments"]}
/>`}
              </pre>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">With Error</h3>
            <CheckboxGroup
              legend="Required Selections"
              options={[
                {
                  id: "option1",
                  label: "Option 1",
                  value: "option1"
                },
                {
                  id: "option2",
                  label: "Option 2",
                  value: "option2"
                },
                {
                  id: "option3",
                  label: "Option 3",
                  value: "option3"
                }
              ]}
              error="Please select at least one option"
            />
            
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-semibold mb-2">Example Code</h4>
              <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<CheckboxGroup
  legend="Required Selections"
  options={[
    {
      id: "option1",
      label: "Option 1",
      value: "option1"
    },
    {
      id: "option2",
      label: "Option 2",
      value: "option2"
    },
    {
      id: "option3",
      label: "Option 3",
      value: "option3"
    }
  ]}
  error="Please select at least one option"
/>`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 