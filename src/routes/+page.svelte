<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    import { VehicleTypes } from "$lib/constants";
    import { VehicleModels } from "$lib/constants";
    import { VehiclePrimaryUses } from "$lib/constants";
    import { VehicleMake } from "$lib/constants";

    export let form: ActionData;

    // Function to get the name associated with the value
    const getMakeName = (value:string) => {
        const make = VehicleMake.find((make) => make.value === value);
        return make ? make.name : "Unknown";
    };

    // On component mount, set the selectedMake based on the server response
    function selectedMake(){
        const responseValue = form?.response.label.match(/\d+/); // Extract the number from the response
        console.log(responseValue);
        
        return  responseValue
            ? getMakeName(responseValue[0])
            : "Unknown";
    }
</script>

<pre>
    {JSON.stringify(form, null, 2)}
</pre>

<h2>
    {#if form?.response}
        Vehicle make: {selectedMake()}
    {/if}
</h2>

<form method="POST" action="?/getLabel" use:enhance>
    <div class="grid">
        <div>
            <label for="vehicleType"> Vehicle type </label>
            <select id="vehicleType" name="vehicletype" required>
                <option value="" selected>Select a vehicle type</option>
                {#each VehicleTypes as vehicleType}
                    <option value={vehicleType.value}>{vehicleType.name}</option
                    >
                {/each}
            </select>
            <label for="vehicleModel"> Vehicle model </label>
            <select id="vehicleModel" name="vehiclemodel" required>
                <option value="" selected>Select a vehicle model</option>
                {#each VehicleModels as vehicleModel}
                    <option value={vehicleModel.value}
                        >{vehicleModel.name}</option
                    >
                {/each}
            </select>
        </div>
        <div>
            <label for="vehiclePrimaryUse"> Vehicle primary use </label>
            <select id="vehiclePrimaryUse" name="vehicleprimaryuse" required>
                <option value="" selected>Select a vehicle primary use</option>
                {#each VehiclePrimaryUses as vehiclePrimaryUse}
                    <option value={vehiclePrimaryUse.value}
                        >{vehiclePrimaryUse.name}</option
                    >
                {/each}
            </select>
            <label for="vehicleRegistrationNumber">
                Vehicle registration number
                <input
                    type="number"
                    id="vehicleRegistrationNumber"
                    name="vehicleregistrationnumber"
                    placeholder="Vehicle registration number"
                    step="1"
                    min="1"
                    max="230"
                    required
                />
            </label>
        </div>
    </div>

    <!-- Button -->
    <button type="submit">Submit</button>
</form>
