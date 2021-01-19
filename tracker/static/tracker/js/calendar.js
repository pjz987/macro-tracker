var dateTime = JSON.parse(document.querySelector('#date_time').textContent);
var monthStart = JSON.parse(document.querySelector('#month_start').textContent);
var monthLength = JSON.parse(document.querySelector('#month_length').textContent);
var loggedDays = JSON.parse(document.querySelector('#logged_days').textContent);
var day = JSON.parse(document.querySelector('#day').textContent);
var yearMonth = JSON.parse(document.querySelector('#year_month').textContent);

var preMonthDay = {
    template: `<div class="day pre"></div>`,
}

var postMonthDay = {
    template: `<div class="day post"></div>`,
}

var monthDay = {
    props: ['day', 'loggedDays'],
    template: `<div class="day" @click="getDay">
            <div class="upper-day">{{ day }}</div>
            <div class="lower-day">{{ trainOrRest }}</div>
        </div>`,
    computed: {
        trainOrRest: function() {
            for (let i=0; i<loggedDays.length; i++) {
                if (loggedDays[i].day == this.day) {
                    console.log(this.day);
                    if (loggedDays[i].train) {
                        return 'Training Day'
                    } else {
                        return 'Rest Day'
                    }
                }
            }
        },

        paddedDay: function() {
            return String(this.day).padStart(2, '0');
        },

        dateString: function() {
            return `${yearMonth}${this.paddedDay}`
        },

        href: function() {
            return day.slice(0, day.length -2) + this.dateString
        },
        
    },
    methods: {
        getDay: function() {
            window.location = this.href
        }
    }
}

var app = new Vue({
    el: '#app',
    data: {
        monthStart,
        monthLength,
        loggedDays,
        // monthDays: [],
    },
    components: {
        monthDay,
        preMonthDay,
        postMonthDay,
    },
    computed: {
        monthDays: function() {
            monthDaysArr = []
            for (let i=0; i<monthLength; i++) {
                monthDaysArr.push(i+1);
            }
            return monthDaysArr
        },

        preMonthDays: function() {
            if (monthStart===6) {
                return 0
            } else {
                return monthStart + 1;
            }
        },

        postMonthDays: function() {
            return 7 - (this.preMonthDays + monthLength) % 7
        },
    },
})

let datePicker = document.querySelector('#date-picker');
datePicker.addEventListener('input', (e) => {
    console.log(e.target.value);
    window.location = day.slice(0, day.length - 2) + e.target.value;
})