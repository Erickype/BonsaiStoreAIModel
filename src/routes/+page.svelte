<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    import { VehicleTypes } from "$lib/constants";
    import { VehicleModels } from "$lib/constants";
    import { VehiclePrimaryUses } from "$lib/constants";

    export let form: ActionData;
</script>

<pre>
    {JSON.stringify(form, null, 2)}
</pre>

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
