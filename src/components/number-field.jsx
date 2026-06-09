import {
    Field,
    FieldError,
    FieldLabel
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText
} from "@/components/ui/input-group";

// A single labeled numeric input with an optional $ prefix or %/x suffix
// decoration. `decimals` toggles between a two-decimal value and a whole
// number; in both cases typing is filtered so only valid, non-negative
// numbers can be entered (type-in only, no spinner).
export const NumberField = ({
    id,
    label,
    value,
    onChange,
    prefix,
    suffix,
    decimals = false,
    readOnly = false,
    placeholder,
    error,
    tabIndex
}) => {
    const handleChange = (event) => {
        const raw = event.target.value;
        const pattern = decimals ? /^\d*\.?\d{0,2}$/ : /^\d*$/;
        if (raw === "" || pattern.test(raw)) {
            onChange(raw);
        }
    };

    return (
        <Field data-invalid={!!error}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <InputGroup>
                {prefix && (
                    <InputGroupAddon align="inline-start">
                        <InputGroupText>{prefix}</InputGroupText>
                    </InputGroupAddon>
                )}
                <InputGroupInput
                    id={id}
                    className="placeholder:text-muted-foreground/60"
                    inputMode={decimals ? "decimal" : "numeric"}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    tabIndex={tabIndex}
                    aria-invalid={!!error}
                />
                {suffix && (
                    <InputGroupAddon align="inline-end">
                        <InputGroupText>{suffix}</InputGroupText>
                    </InputGroupAddon>
                )}
            </InputGroup>
            <FieldError>{error}</FieldError>
        </Field>
    );
};
