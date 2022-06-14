import moment from 'moment'

export const prepareTasks = ( tasks = [] ) => {

    return tasks.map(
        (e) => ({
            ...e,
            date: moment( e.date ).toDate(),
        })
    );

}