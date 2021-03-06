'use strict';

module.exports = {
    getArrayFromFormData: (formData, idKey) => {
        let result = [];

        for (let key in formData) {
            if (~key.indexOf(idKey + '_')) {
                let id = key.split(idKey + '_')[1];
                
                result.push(id);
            }
        }

        return result;
    },

    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),

    locateLessonInTime: (lesson) => {
        let dateNow = new Date;
        let now = dateNow.getHours() * 60 + dateNow.getMinutes();

        let begins = lesson.timing.start.getHours() * 60 + lesson.timing.start.getMinutes();
        let ends = begins + lesson.timing.duration;

        let isNow = begins <= now && now < ends;

        let minutesLeft = ends - now;
        let hoursLeft = Math.floor(minutesLeft / 60);
        let timeleftString = hoursLeft
            ? `${hoursLeft} ч ${minutesLeft - (60 * hoursLeft)} мин`
            : `${minutesLeft} мин`;

        return {
            begins,
            ends,
            isNow,
            timeleftString
        }
    }
}