'use strict';

module.exports = {
    
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
    
    locateLessonInTime: (lesson) => {
        let dateNow = new Date;
        let now = dateNow.getHours() * 60 + dateNow.getMinutes();

        let begins = lesson.timing.start.getHours() * 60 + lesson.timing.start.getMinutes();
        let ends = begins + lesson.timing.duration;

        let isNow = begins <= now && now < ends; 

        return {
            isNow,
            timeleftString: isNow ? `осталось ${ends - now} мин` : null
        }
    }
}