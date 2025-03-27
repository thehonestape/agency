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
import { 
  DatePicker, 
  datePickerVariants, 
  dateInputVariants, 
  dateIconVariants 
} from "./date-picker";
import { 
  TimePicker, 
  timePickerVariants, 
  timeInputVariants, 
  timeIconVariants 
} from "./time-picker";
import { 
  DateTimePicker, 
  dateTimePickerVariants, 
  dateTimeInputVariants, 
  dateTimeIconVariants 
} from "./date-time-picker";
import { 
  MonthPicker, 
  monthPickerVariants, 
  monthInputVariants, 
  monthIconVariants 
} from "./month-picker";

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
  DatePicker,
  datePickerVariants,
  dateInputVariants,
  dateIconVariants,
  TimePicker,
  timePickerVariants,
  timeInputVariants,
  timeIconVariants,
  DateTimePicker,
  dateTimePickerVariants,
  dateTimeInputVariants,
  dateTimeIconVariants,
  MonthPicker,
  monthPickerVariants,
  monthInputVariants,
  monthIconVariants,
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
  DatePicker,
  TimePicker,
  DateTimePicker,
  MonthPicker,
} as const; 