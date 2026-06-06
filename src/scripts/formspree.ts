type FormspreeErrorResponse = {
    errors?: { message?: string }[]
}

const DEFAULT_ERROR_MESSAGE =
    'Oops! There was a problem submitting your form'
const SUCCESS_MESSAGE = 'Thanks for your submission!'

function getFormspreeErrorMessage(data: unknown) {
    const response = data as FormspreeErrorResponse
    const messages = response.errors
        ?.map((error) => error.message)
        .filter((message): message is string => Boolean(message))

    return messages?.length ? messages.join(', ') : undefined
}

function setStatus(status: HTMLElement | null, message: string) {
    if (status) {
        status.textContent = message
    }
}

export function setupFormspreeForm(form: HTMLFormElement | null) {
    if (!form) return

    const status = form.querySelector<HTMLElement>('[data-form-status]')

    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    Accept: 'application/json',
                },
            })

            if (response.ok) {
                setStatus(status, SUCCESS_MESSAGE)
                form.reset()
                return
            }

            const errorMessage = getFormspreeErrorMessage(
                await response.json(),
            )
            setStatus(status, errorMessage || DEFAULT_ERROR_MESSAGE)
        } catch {
            setStatus(status, DEFAULT_ERROR_MESSAGE)
        }
    })
}
