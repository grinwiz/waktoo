module.exports = {
  monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
  monthsLong: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
  daysShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
  daysLong: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
  AM: "AM",
  PM: "PM",

  humanize: {
    past: {
      seconds: "beberapa detik yang lalu",
      minute: "1 menit yang lalu",
      minutes: n => `${n} menit yang lalu`,
      hour: "1 jam yang lalu",
      hours: n => `${n} jam yang lalu`,
      day: "1 hari yang lalu",
      days: n => `${n} hari yang lalu`,
      month: "1 bulan yang lalu",
      months: n => `${n} bulan yang lalu`,
      year: "1 tahun yang lalu",
      years: n => `${n} tahun yang lalu`
    },
    future: {
      seconds: "dalam beberapa detik",
      minute: "dalam 1 menit",
      minutes: n => `dalam ${n} menit`,
      hour: "dalam 1 jam",
      hours: n => `dalam ${n} jam`,
      day: "dalam 1 hari",
      days: n => `dalam ${n} hari`,
      month: "dalam 1 bulan",
      months: n => `dalam ${n} bulan`,
      year: "dalam 1 tahun",
      years: n => `dalam ${n} tahun`
    },
    none: {
      seconds: "beberapa detik",
      minute: "1 menit",
      minutes: n => `${n} menit`,
      hour: "1 jam",
      hours: n => `${n} jam`,
      day: "1 hari",
      days: n => `${n} hari`,
      month: "1 bulan",
      months: n => `${n} bulan`,
      year: "1 tahun",
      years: n => `${n} tahun`
    }
  },

  calendar: {
    sameDay: (time) => `Hari ini pukul ${time}`,
    nextDay: (time) => `Besok pukul ${time}`,
    lastDay: (time) => `Kemarin pukul ${time}`,
    nextWeek: (weekday, time) => `${weekday} pukul ${time}`,
    lastWeek: (weekday, time) => `${weekday} pukul ${time}`,
    sameElse: (date) => date
  },

  units: {
    year: "tahun",
    years: "tahun",
    month: "bulan",
    months: "bulan",
    week: "minggu",
    weeks: "minggu",
    day: "hari",
    days: "hari",
    hour: "jam",
    hours: "jam",
    minute: "menit",
    minutes: "menit",
    second: "detik",
    seconds: "detik"
  }
};
