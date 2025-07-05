import { generateFunctionMap } from "./tools";

function checkAppointmentAvailability(datetime: string){
    console.log("Calling check_appointment_availability ", datetime)
    return true;
}

function scheduleAppointment(datetime: string, name: string, email: string){
    console.log("Calling schedule_appointment ", datetime, name, email)
    return true;
}

function deleteAppointment(datetime: string, name: string, email: string){
    console.log("Calling delete_appointment ", datetime, name, email)
    return true;
}


const appointmentFunctionMap  = generateFunctionMap(checkAppointmentAvailability, scheduleAppointment, deleteAppointment)

export {checkAppointmentAvailability, scheduleAppointment, deleteAppointment, appointmentFunctionMap}
