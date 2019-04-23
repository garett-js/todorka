export const enabledFormControls = (formObject) => {
    Object.keys(formObject.controls).forEach((control) => {
        formObject.form[control].removeAttribute("disabled")
    })
}

export const disabledFormControls = (formObject) => {
    Object.keys(formObject.controls).forEach((control) => {
        formObject.form[control].setAttribute("disabled", "disabled")
    })
}

export const hideElement = (el) => el.classList.add('js-hide')
export const showElement = (el) => el.classList.remove('js-hide')

export const visibilityHandler = (toHideElement, toShowElement) => {
    hideElement(toHideElement)
    showElement(toShowElement)
}

export const addValueToElement = (value, el) => el.innerHTML = value
