import moment from 'moment'

export const timeFormat = 'YYYY-MM-DD'

// 当前天
export const currentDay = moment().format(timeFormat)

// 当前月第一天
export const monthStartDay = moment().startOf('month').format(timeFormat)

// 当前月最后一天
export const monthEndDay = moment().endOf('month').format(timeFormat)

// string time => moment 类型
export const timeToMoment = time => (time ? moment(time) : moment())

// moment 类型 => string time
export const momentToTime = time => (time ? time.format(timeFormat) : '')
