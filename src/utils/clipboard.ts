export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // Retain the legacy copy behavior when the Clipboard API is denied.
    }
  }

  const activeElement = document.activeElement as HTMLElement | null
  const input = document.createElement('textarea')
  input.value = text
  input.setAttribute('readonly', '')
  input.style.cssText = 'position:fixed;left:-9999px;top:0'
  document.body.appendChild(input)
  try {
    input.select()
    if (!document.execCommand('copy')) throw new Error('Clipboard copy failed')
  } finally {
    input.remove()
    activeElement?.focus({ preventScroll: true })
  }
}
