import React, { useState } from 'react';
import { 
  Checkbox, 
  CheckboxWithLabel, 
  Radio, 
  RadioGroup, 
  RadioItem,
  Card,
  CardContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Toast,
  ToastProvider,
  ToastAction,
  Alert,
  AlertTitle,
  AlertDescription,
  Banner,
  BannerTitle,
  BannerDescription
} from '@/components/ui';
import { InfoIcon, AlertTriangleIcon, XCircleIcon, CheckCircleIcon, BellIcon } from 'lucide-react';

export function FormControlsExample() {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<"default" | "success" | "destructive" | "warning" | "info">("default");
  const [showBanner, setShowBanner] = useState(true);
  
  const handleShowToast = (variant: "default" | "success" | "destructive" | "warning" | "info") => {
    setToastVariant(variant);
    setShowToast(true);
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  
  return (
    <div className="form-controls-showcase space-y-8">
      {showBanner && (
        <Banner 
          variant="marketing" 
          position="top" 
          onClose={() => setShowBanner(false)}
          className="marketing-banner bg-primary/10 border border-primary/20 rounded-lg shadow-sm"
        >
          <div className="banner-content flex items-center gap-3">
            <BellIcon className="banner-icon h-5 w-5 text-primary" />
            <div className="banner-text">
              <BannerTitle className="banner-title text-primary">UI Components Library</BannerTitle>
              <BannerDescription className="banner-description text-primary/80">Browse form controls and interactive elements below</BannerDescription>
            </div>
          </div>
        </Banner>
      )}
      
      <Card className="form-card border border-border shadow-sm overflow-hidden bg-card">
        <div className="card-header border-b border-border bg-secondary px-6 py-4">
          <h2 className="card-title text-lg font-medium text-foreground">Checkbox Examples</h2>
        </div>
        
        <CardContent className="card-content p-6">
          <div className="checkboxes-showcase space-y-8">
            {/* Basic Checkbox */}
            <div className="checkbox-group">
              <h3 className="group-title text-sm font-medium mb-3 text-foreground">Basic Checkbox</h3>
              <div className="checkbox-examples flex items-center gap-6">
                <div className="checkbox-item flex items-center gap-2">
                  <Checkbox id="checkbox-basic" />
                  <label htmlFor="checkbox-basic" className="checkbox-label text-sm text-foreground">Default</label>
                </div>
                <div className="checkbox-item flex items-center gap-2">
                  <Checkbox id="checkbox-checked" defaultChecked />
                  <label htmlFor="checkbox-checked" className="checkbox-label text-sm text-foreground">Checked</label>
                </div>
                <div className="checkbox-item flex items-center gap-2">
                  <Checkbox id="checkbox-disabled" disabled />
                  <label htmlFor="checkbox-disabled" className="checkbox-label text-sm text-muted-foreground">Disabled</label>
                </div>
                <div className="checkbox-item flex items-center gap-2">
                  <Checkbox id="checkbox-disabled-checked" disabled defaultChecked />
                  <label htmlFor="checkbox-disabled-checked" className="checkbox-label text-sm text-muted-foreground">Disabled checked</label>
                </div>
              </div>
            </div>
            
            {/* Checkbox with Label */}
            <div className="checkbox-group">
              <h3 className="group-title text-sm font-medium mb-3 text-foreground">Checkbox with Label</h3>
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
            <div className="checkbox-group">
              <h3 className="group-title text-sm font-medium mb-3 text-foreground">Notification Preferences</h3>
              <fieldset className="checkbox-fieldset border border-border rounded-lg p-4 bg-secondary/50">
                <legend className="fieldset-legend text-xs font-medium text-muted-foreground px-2">Email settings</legend>
                <div className="space-y-4 mt-2">
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
        </CardContent>
      </Card>

      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Radio Examples</h2>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Basic Radio Buttons */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-200">Basic Radio Buttons</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Radio id="radio-1" name="basic-radio" value="1" />
                  <label htmlFor="radio-1" className="text-sm text-gray-700 dark:text-gray-300">Option 1</label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="radio-2" name="basic-radio" value="2" defaultChecked />
                  <label htmlFor="radio-2" className="text-sm text-gray-700 dark:text-gray-300">Option 2</label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="radio-3" name="basic-radio" value="3" disabled />
                  <label htmlFor="radio-3" className="text-sm text-gray-500 dark:text-gray-500">Disabled</label>
                </div>
              </div>
            </div>
            
            {/* Radio Group with Labels */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-200">Notification Method</h3>
              <RadioGroup className="space-y-3 border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-900/50">
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
              <h3 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-200">Server Size</h3>
              <RadioGroup className="space-y-3 border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-900/50">
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
        </CardContent>
      </Card>

      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Dialog Examples</h2>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Basic Dialog */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-200">Basic Dialog</h3>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="border border-gray-200 dark:border-gray-800 shadow-lg">
                  <DialogHeader>
                    <DialogTitle>Basic Dialog</DialogTitle>
                    <DialogDescription>
                      This is a basic dialog example with a title and description.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 border-y border-gray-200 dark:border-gray-800 my-2">
                    <p className="text-gray-700 dark:text-gray-300">Dialog content goes here. This can include forms, information, or any other content.</p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {}} className="border-gray-300 dark:border-gray-700">Cancel</Button>
                    <Button>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Controlled Dialog */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-200">Controlled Dialog</h3>
              <Button variant="outline" onClick={() => setOpen(true)} className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                Open Controlled Dialog
              </Button>
              
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="border border-gray-200 dark:border-gray-800 shadow-lg">
                  <DialogHeader>
                    <DialogTitle>Controlled Dialog</DialogTitle>
                    <DialogDescription>
                      This dialog's state is controlled by React state.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 border-y border-gray-200 dark:border-gray-800 my-2">
                    <p className="text-gray-700 dark:text-gray-300">You can programmatically control this dialog using React state.</p>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setOpen(false)}>Close Dialog</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Examples Card */}
      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden bg-white dark:bg-gray-800">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Alert Examples</h2>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <Alert>
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert with a title and description.
              </AlertDescription>
            </Alert>
            
            <Alert variant="info">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This alert provides useful information to the user.
              </AlertDescription>
            </Alert>
            
            <Alert variant="success">
              <CheckCircleIcon className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                The operation was completed successfully.
              </AlertDescription>
            </Alert>
            
            <Alert variant="warning">
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This action might lead to unexpected results.
              </AlertDescription>
            </Alert>
            
            <Alert variant="destructive">
              <XCircleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was a problem with your request.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Toast Examples Card */}
      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden bg-white dark:bg-gray-800">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Toast Examples</h2>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-200">Toast Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => handleShowToast("default")} className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                  Default Toast
                </Button>
                <Button variant="outline" onClick={() => handleShowToast("success")} className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                  Success Toast
                </Button>
                <Button variant="outline" onClick={() => handleShowToast("destructive")} className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                  Destructive Toast
                </Button>
                <Button variant="outline" onClick={() => handleShowToast("warning")} className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                  Warning Toast
                </Button>
                <Button variant="outline" onClick={() => handleShowToast("info")} className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                  Info Toast
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Toast Provider */}
      {showToast && (
        <ToastProvider>
          <Toast
            variant={toastVariant}
            title={`${toastVariant.charAt(0).toUpperCase() + toastVariant.slice(1)} Toast`}
            description="This is an example of a toast notification."
            onClose={() => setShowToast(false)}
            action={
              <ToastAction>
                <Button size="sm" variant="outline" onClick={() => setShowToast(false)} className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                  Dismiss
                </Button>
              </ToastAction>
            }
          />
        </ToastProvider>
      )}
    </div>
  );
}

export default FormControlsExample; 