<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    import { VehicleTypes } from "$lib/constants";

    export let form: ActionData;
</script>

<pre>
    {JSON.stringify(form, null, 2)}
</pre>

<form method="POST" action="?/getLabel" use:enhance>
    <div class="grid">
        <div>
            <label for="vehicleType"> Vehicle type </label>
            <select id="vehicleType" name="vehicleType" required>
                <option value="" selected>Select a vehicle type</option>
                {#each VehicleTypes as vehicleType}
                    <option value={vehicleType.value}>{vehicleType.name}</option>
                {/each}
            </select>
        </div>
        <div>
            <label for="vehicleRegistrationNumber">
                Vehicle registration number
                <input
                    type="number"
                    id="vehicleRegistrationNumber"
                    name="vehicleRegistrationNumber"
                    placeholder="Vehicle registration number"
                    step="0.01"
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
