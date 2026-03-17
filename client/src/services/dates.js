const formatTime = (timeStr) => {
    if (!timeStr) return ''
    const [hours, minutes] = timeStr.split(':')
    const h = parseInt(hours)
    const suffix = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 || 12
    return `${h12}:${minutes} ${suffix}`
}

const formatRemainingTime = (days) => {
    if (days === null || days === undefined) return ''
    const d = parseInt(days)
    if (d < 0) return `${Math.abs(d)} days ago`
    if (d === 0) return 'Today!'
    if (d === 1) return '1 day away'
    return `${d} days away`
}

const formatNegativeTimeRemaining = (remaining, id) => {
    if (!remaining) return
    const element = document.getElementById(`remaining-${id}`)
    if (element && remaining.includes('days ago')) {
        element.style.backgroundColor = 'rgba(220, 20, 60, 0.8)'
    }
}

const dates = { formatTime, formatRemainingTime, formatNegativeTimeRemaining }
export default dates
