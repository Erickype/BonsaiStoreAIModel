import type { Actions } from './$types';

export const actions = {
    getLabel: async ({ request }) => {
        const formData = await request.formData();

        /* const jsonObject = Object.fromEntries(formData.entries())
        console.log(formData);   */
        const jsonObject: { [key: string]: string | number } = {};
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                // Handle File object, e.g., convert to string or omit
                jsonObject[key] = 'File object';
            } else {
                const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
                jsonObject[key] = parsedValue;
            }
        }
        console.log(jsonObject);
        

        const response = await fetch('https://a1cd-34-29-44-16.ngrok-free.app/getLabel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonObject),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return { success: true, response: responseData};
        } else {
            console.error('HTTP request failed');
            return { success: false };
        }
    }
} satisfies Actions;