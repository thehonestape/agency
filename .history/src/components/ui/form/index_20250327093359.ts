import { Input, inputVariants } from "./input";
import { 
  Select, 
  SelectGroup, 
  SelectValue, 
  SelectLabel, 
  SelectSeparator, 
  selectVariants 
} from "./select";
import { 
  Checkbox, 
  CheckboxGroup, 
  checkboxVariants 
} from "./checkbox";
import { 
  Radio, 
  RadioGroup, 
  radioVariants 
} from "./radio";
import { 
  Textarea, 
  textareaVariants 
} from "./textarea";
import { 
  Switch, 
  SwitchGroup, 
  switchVariants, 
  switchThumbVariants 
} from "./switch";
import { 
  Slider, 
  sliderVariants, 
  sliderTrackVariants, 
  sliderRangeVariants, 
  sliderThumbVariants 
} from "./slider";
import { 
  ColorPicker, 
  colorPickerVariants, 
  colorPreviewVariants, 
  colorInputVariants 
} from "./color-picker";

export {
  Input,
  inputVariants,
  Select,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectSeparator,
  selectVariants,
  Checkbox,
  CheckboxGroup,
  checkboxVariants,
  Radio,
  RadioGroup,
  radioVariants,
  Textarea,
  textareaVariants,
  Switch,
  SwitchGroup,
  switchVariants,
  switchThumbVariants,
  Slider,
  sliderVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
  ColorPicker,
  colorPickerVariants,
  colorPreviewVariants,
  colorInputVariants,
};

// Semantic form composition
export const Form = {
  Input,
  Select,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectSeparator,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Textarea,
  Switch,
  SwitchGroup,
  Slider,
  ColorPicker,
} as const; 