import {tool} from "@openai/agents";
import {z} from "zod";

type SaveAppointmentInput = {
    datetime: string;
    name: string;
    email: string
};

const checkAppointmentTool = tool({
    name: "check_appointment_availability",
    description: "Check if an appointment is available at the given datetime",
    parameters: z.object({datetime: z.string()}),
    async execute({datetime}: {datetime: string}) {
        console.log("Calling check_appointment_availability ", datetime);
        return 'response is true'
    },
});

const deleteAppointmentTool = tool({
    name: "delete_appointment",
    description: "Delete an appointment at the given datetime",
    parameters: z.object({datetime: z.string(), name: z.string(), email: z.string()}),
    async execute(input: SaveAppointmentInput) {
        const {datetime, name, email} = input;
        console.log("Calling delete_appointment ", datetime, name, email);
        return `Appointment deleted for ${name} at ${datetime} with email ${email}`;
    },
});

const scheduleAppointmentTool = tool({
    name: "schedule_appointment",
    description: "Delete an appointment at the given datetime",
    parameters: z.object({datetime: z.string(), name: z.string(), email: z.string()}),
    async execute(input: SaveAppointmentInput) {
        const {datetime, name, email} = input;
        console.log("Calling schedule_appointment ", datetime, name, email);
        return `Appointment scheduled for ${name} at ${datetime} with email ${email}`
    },
});

export {checkAppointmentTool, deleteAppointmentTool, scheduleAppointmentTool};
