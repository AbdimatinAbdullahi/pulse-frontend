export const times = [
  { label: "12:00 AM", value: "00:00" },
  { label: "12:30 AM", value: "00:30" },
  { label: "1:00 AM", value: "01:00" },
  { label: "1:30 AM", value: "01:30" },
  { label: "2:00 AM", value: "02:00" },
  { label: "2:30 AM", value: "02:30" },
  { label: "3:00 AM", value: "03:00" },
  { label: "3:30 AM", value: "03:30" },
  { label: "4:00 AM", value: "04:00" },
  { label: "4:30 AM", value: "04:30" },
  { label: "5:00 AM", value: "05:00" },
  { label: "5:30 AM", value: "05:30" },
  { label: "6:00 AM", value: "06:00" },
  { label: "6:30 AM", value: "06:30" },
  { label: "7:00 AM", value: "07:00" },
  { label: "7:30 AM", value: "07:30" },
  { label: "8:00 AM", value: "08:00" },
  { label: "8:30 AM", value: "08:30" },
  { label: "9:00 AM", value: "09:00" },
  { label: "9:30 AM", value: "09:30" },
  { label: "10:00 AM", value: "10:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "11:00 AM", value: "11:00" },
  { label: "11:30 AM", value: "11:30" },
  { label: "12:00 PM", value: "12:00" },
  { label: "12:30 PM", value: "12:30" },
  { label: "1:00 PM", value: "13:00" },
  { label: "1:30 PM", value: "13:30" },
  { label: "2:00 PM", value: "14:00" },
  { label: "2:30 PM", value: "14:30" },
  { label: "3:00 PM", value: "15:00" },
  { label: "3:30 PM", value: "15:30" },
  { label: "4:00 PM", value: "16:00" },
  { label: "4:30 PM", value: "16:30" },
  { label: "5:00 PM", value: "17:00" },
  { label: "5:30 PM", value: "17:30" },
  { label: "6:00 PM", value: "18:00" },
  { label: "6:30 PM", value: "18:30" },
  { label: "7:00 PM", value: "19:00" },
  { label: "7:30 PM", value: "19:30" },
  { label: "8:00 PM", value: "20:00" },
  { label: "8:30 PM", value: "20:30" },
  { label: "9:00 PM", value: "21:00" },
  { label: "9:30 PM", value: "21:30" },
  { label: "10:00 PM", value: "22:00" },
  { label: "10:30 PM", value: "22:30" },
  { label: "11:00 PM", value: "23:00" },
  { label: "11:30 PM", value: "23:30" }
];


export function tomorrowsDate(timeZone){
    
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const tomorrowFormatted = new Intl.DateTimeFormat("en-CA", {
        timeZone: timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })

    return tomorrowFormatted.format(tomorrow)
}

export function timeFomartLocalTime(time){

  const cleanedTimeStamp = time.replace(/ \+\d+ UTC$/, 'Z')
  const date = new Date(cleanedTimeStamp)
  const localTime = date.toLocaleDateString("en-US", {
    year: "numeric",
    day:"2-digit",
    month:"long"
  })

  return localTime
}

export function BackendToNowTime(time) {
  const date = new Date(time);
  return date.toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" , minute: "2-digit", hour: "2-digit", hour12: true});
}
