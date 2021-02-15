export function createControl(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: '',
    }
}
export function validate(value, validation = null) {
    if (!validation) {
        return true
    }

    let isValid = true

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }
    if (value.length >= validation.Maxlength) return false
    return isValid
}
export function validateForm(f) {
    let isFormValid = true
    for (let key in f) {
        if (f.hasOwnProperty(key)) {
            isFormValid = f[key].valid && isFormValid
        }
    }
    return isFormValid
}
