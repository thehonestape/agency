import React from 'react';
import { 
  Checkbox, 
  CheckboxWithLabel, 
  Radio, 
  RadioGroup, 
  RadioItem,
  Card
} from '@/components/ui';

export function FormControlsExample() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Checkbox Examples</h2>
        
        <div className="space-y-6">
          {/* Basic Checkbox */}
          <div>
            <h3 className="text-sm font-medium mb-2">Basic Checkbox</h3>
            <div className="flex items-center gap-4">
              <Checkbox id="checkbox-basic" />
              <Checkbox id="checkbox-checked" defaultChecked />
              <Checkbox id="checkbox-disabled" disabled />
              <Checkbox id="checkbox-disabled-checked" disabled defaultChecked />
            </div>
          </div>
          
          {/* Checkbox with Label */}
          <div>
            <h3 className="text-sm font-medium mb-2">Checkbox with Label</h3>
            <div className="space-y-3">
              <CheckboxWithLabel 
                id="terms" 
                label="Accept terms and conditions" 
              />
              <CheckboxWithLabel 
                id="newsletter" 
                label="Subscribe to newsletter" 
                description="Get notified about new products and features."
                defaultChecked
              />
              <CheckboxWithLabel 
                id="disabled-option" 
                label="Unavailable option" 
                description="This option is currently unavailable."
                disabled
              />
            </div>
          </div>

          {/* Checkbox List with Description */}
          <div>
            <h3 className="text-sm font-medium mb-2">Notification Preferences</h3>
            <fieldset>
              <legend className="sr-only">Notifications</legend>
              <div className="space-y-5">
                <CheckboxWithLabel
                  id="comments"
                  name="comments"
                  label="Comments"
                  description="Get notified when someone posts a comment on your post."
                  defaultChecked
                />
                <CheckboxWithLabel
                  id="candidates"
                  name="candidates"
                  label="Candidates"
                  description="Get notified when a candidate applies for a job."
                />
                <CheckboxWithLabel
                  id="offers"
                  name="offers"
                  label="Offers"
                  description="Get notified when a candidate accepts or rejects an offer."
                />
              </div>
            </fieldset>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Radio Examples</h2>
        
        <div className="space-y-6">
          {/* Basic Radio Buttons */}
          <div>
            <h3 className="text-sm font-medium mb-2">Basic Radio Buttons</h3>
            <div className="flex items-center gap-4">
              <Radio id="radio-1" name="basic-radio" value="1" />
              <Radio id="radio-2" name="basic-radio" value="2" defaultChecked />
              <Radio id="radio-3" name="basic-radio" value="3" disabled />
            </div>
          </div>
          
          {/* Radio Group with Labels */}
          <div>
            <h3 className="text-sm font-medium mb-2">Notification Method</h3>
            <RadioGroup className="space-y-3">
              <RadioItem
                id="notification-email"
                name="notification-method"
                value="email"
                label="Email"
                defaultChecked
              />
              <RadioItem
                id="notification-sms"
                name="notification-method"
                value="sms"
                label="Phone (SMS)"
              />
              <RadioItem
                id="notification-push"
                name="notification-method"
                value="push"
                label="Push notification"
              />
            </RadioGroup>
          </div>

          {/* Radio Group with Descriptions */}
          <div>
            <h3 className="text-sm font-medium mb-2">Server Size</h3>
            <RadioGroup className="space-y-3">
              <RadioItem
                id="size-small"
                name="server-size"
                value="small"
                label="Small"
                description="4 GB RAM / 2 CPUS / 80 GB SSD Storage"
                defaultChecked
              />
              <RadioItem
                id="size-medium"
                name="server-size"
                value="medium"
                label="Medium"
                description="8 GB RAM / 4 CPUS / 160 GB SSD Storage"
              />
              <RadioItem
                id="size-large"
                name="server-size"
                value="large"
                label="Large"
                description="16 GB RAM / 8 CPUS / 320 GB SSD Storage"
              />
            </RadioGroup>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default FormControlsExample; 