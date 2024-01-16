import type { Actions } from './$types';

export const actions = {
    getLabel: async ({ request }) => {
        const formData = await request.formData();
        console.log(formData);
        
        const jsonObject: { [key: string]: string | number } = {};
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
              // Handle File object, e.g., convert to string or omit
              jsonObject[key] = 'File object';
            } else {
              const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
              jsonObject[key] = parsedValue !== value ? parsedValue : value;
            }
          }
        console.log(JSON.stringify(jsonObject));
        
        const response = await fetch('http://c959-34-83-227-93.ngrok-free.app/getLabel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonObject),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return { response: responseData};
        } else {
            console.error('HTTP request failed');
            return { success: false };
        }
    }
} satisfies Actions;