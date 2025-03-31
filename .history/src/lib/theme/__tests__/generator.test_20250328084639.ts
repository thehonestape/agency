import { generateTheme } from '../generator';
import { ThemeColors } from '../types';

describe('Theme Generator', () => {
  const primaryColor = '#3b82f6';
  const secondaryColor = '#10b981';
  const accentColor = '#f59e0b';

  describe('Color Generation', () => {
    it('should generate a complete theme with all required colors', () => {
      const theme = generateTheme({
        primaryColor,
        secondaryColor,
        accentColor,
        mode: 'light',
      });

      const colors = theme.colors as ThemeColors;

      // Check base colors
      expect(colors.primary).toBe(primaryColor);
      expect(colors.secondary).toBe(secondaryColor);
      expect(colors.accent).toBe(accentColor);

      // Check UI colors
      expect(colors.background).toBe('#ffffff');
      expect(colors.foreground).toBe('#111827');
      expect(colors.card).toBe('#ffffff');
      expect(colors.muted).toBe('#f3f4f6');
      expect(colors.border).toBe('#e5e7eb');
      expect(colors.input).toBe('#ffffff');
      expect(colors.popover).toBe('#ffffff');

      // Check state colors
      expect(colors.destructive).toBe('#ef4444');
      expect(colors.success).toBe('#22c55e');
      expect(colors.warning).toBe('#f59e0b');
      expect(colors.info).toBe('#3b82f6');

      // Check navigation colors
      expect(colors['nav-bg']).toBe('#ffffff');
      expect(colors['nav-border']).toBe('#e5e7eb');
      expect(colors['nav-text']).toBe('#111827');
      expect(colors['nav-icon']).toBe('#6b7280');

      // Check color scales
      expect(colors['primary-50']).toBeDefined();
      expect(colors['primary-500']).toBe(primaryColor);
      expect(colors['primary-950']).toBeDefined();
      expect(colors['secondary-50']).toBeDefined();
      expect(colors['secondary-500']).toBe(secondaryColor);
      expect(colors['secondary-950']).toBeDefined();
      expect(colors['accent-50']).toBeDefined();
      expect(colors['accent-500']).toBe(accentColor);
      expect(colors['accent-950']).toBeDefined();
    });

    it('should generate dark mode colors correctly', () => {
      const theme = generateTheme({
        primaryColor,
        secondaryColor,
        accentColor,
        mode: 'dark',
      });

      const colors = theme.colors as ThemeColors;

      // Check dark mode UI colors
      expect(colors.background).toBe('#111827');
      expect(colors.foreground).toBe('#f9fafb');
      expect(colors.card).toBe('#1f2937');
      expect(colors.muted).toBe('#1f2937');
      expect(colors.border).toBe('#374151');
      expect(colors.input).toBe('#1f2937');
      expect(colors.popover).toBe('#1f2937');

      // Check dark mode navigation colors
      expect(colors['nav-bg']).toBe('#1f2937');
      expect(colors['nav-border']).toBe('#374151');
      expect(colors['nav-text']).toBe('#f9fafb');
      expect(colors['nav-icon']).toBe('#9ca3af');
    });

    it('should generate color scales with proper lightness progression', () => {
      const theme = generateTheme({
        primaryColor,
        mode: 'light',
      });

      const colors = theme.colors as ThemeColors;

      // Check lightness progression
      const getLightness = (color: string) => {
        const rgb = color.match(/\w\w/g)?.map(x => parseInt(x, 16)) || [];
        return (Math.max(...rgb) - Math.min(...rgb)) / 255;
      };

      const primary50Lightness = getLightness(colors['primary-50']);
      const primary500Lightness = getLightness(colors['primary-500']);
      const primary950Lightness = getLightness(colors['primary-950']);

      expect(primary50Lightness).toBeLessThan(primary500Lightness);
      expect(primary500Lightness).toBeLessThan(primary950Lightness);
    });

    it('should ensure proper contrast ratios for foreground colors', () => {
      const theme = generateTheme({
        primaryColor,
        mode: 'light',
      });

      const colors = theme.colors as ThemeColors;

      // Check contrast ratios
      const getContrastRatio = (color1: string, color2: string) => {
        const getLuminance = (color: string) => {
          const rgb = color.match(/\w\w/g)?.map(x => parseInt(x, 16) / 255) || [];
          return rgb.map(val => 
            val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
          ).reduce((a, b) => a + b, 0);
        };

        const l1 = getLuminance(color1);
        const l2 = getLuminance(color2);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        return ratio;
      };

      // Check primary color contrast
      const primaryContrast = getContrastRatio(colors.primary, colors['primary-foreground']);
      expect(primaryContrast).toBeGreaterThanOrEqual(4.5); // WCAG AA standard

      // Check background contrast
      const backgroundContrast = getContrastRatio(colors.background, colors.foreground);
      expect(backgroundContrast).toBeGreaterThanOrEqual(4.5);
    });
  });
}); 