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
import { FormGroup, formGroupVariants } from "./form-group";
import { FormSection, formSectionVariants } from "./form-section";
import { FormRow, formRowVariants } from "./form-row";
import { FormGrid, formGridVariants } from "./form-grid";
import { TagInput, tagInputVariants, tagVariants } from "./tag-input";
import { RatingInput, ratingInputVariants, starVariants } from "./rating-input";
import { RangeInput, rangeInputVariants, rangeTrackVariants, rangeThumbVariants } from "./range-input";
import { PasswordInput, passwordInputVariants } from "./password-input";
import { FormError, formErrorVariants } from "./form-error";
import { FormSuccess, formSuccessVariants } from "./form-success";
import { FormWarning, formWarningVariants } from "./form-warning";
import { FormLoading, formLoadingVariants } from "./form-loading";
import { FormDisabled, formDisabledVariants } from "./form-disabled";
import { FormReadOnly, formReadOnlyVariants } from "./form-readonly";

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
  FormGroup,
  formGroupVariants,
  FormSection,
  formSectionVariants,
  FormRow,
  formRowVariants,
  FormGrid,
  formGridVariants,
  TagInput,
  tagInputVariants,
  tagVariants,
  RatingInput,
  ratingInputVariants,
  starVariants,
  RangeInput,
  rangeInputVariants,
  rangeTrackVariants,
  rangeThumbVariants,
  PasswordInput,
  passwordInputVariants,
  FormError,
  formErrorVariants,
  FormSuccess,
  formSuccessVariants,
  FormWarning,
  formWarningVariants,
  FormLoading,
  formLoadingVariants,
  FormDisabled,
  formDisabledVariants,
  FormReadOnly,
  formReadOnlyVariants,
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

export const UI = {
  form: {
    group: FormGroup,
    section: FormSection,
    row: FormRow,
    grid: FormGrid,
    tag: TagInput,
    rating: RatingInput,
    range: RangeInput,
    password: PasswordInput,
    error: FormError,
    success: FormSuccess,
    warning: FormWarning,
    loading: FormLoading,
    disabled: FormDisabled,
    readonly: FormReadOnly,
  },
}; 