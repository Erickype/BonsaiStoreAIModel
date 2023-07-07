<script lang="ts">
    import { onMount } from "svelte";
    import { enhance } from '$app/forms';
    import type { ActionData } from "./$types";

    export let form: ActionData

    // Customers
    const countries: { name: string; value:string }[] = [
        { name: "Ecuador", value:"1"},
        { name: "UK", value:"2" },
    ];
    let selectedProfession = "";
    let salary = "";
    const professions: { name: string; salary: string, value:string }[] = [
        { name: "Doctor", salary: "100000" , value:"1"},
        { name: "Engineer", salary: "80000", value:"2" },
    ];
    let age = 18;

    //Products
    const subcategories: { id: string }[] = [{ id: "2" }];
    let product_age = 1;
    let product_quantity = 1;

    const handleProfessionChange = (event: Event) => {
        selectedProfession = (event.target as HTMLSelectElement).value;
        calculateSalary();
    };

    const calculateSalary = () => {
        const profession = professions.find(
            (p) => p.value === selectedProfession
        );
        salary = profession ? profession.salary : "";
    };

    onMount(() => {
        const professionSelect = document.getElementById(
            "profession"
        ) as HTMLSelectElement;
        professionSelect.addEventListener("change", handleProfessionChange);

        const rangeInput = document.getElementById("age");
        if (rangeInput !== null) {
            rangeInput.addEventListener("input", (event) => {
                const target = event.target as HTMLInputElement;
                age = parseInt(target.value);
            });
        }
        //products
        const rangeProductAge = document.getElementById("product_age");
        if (rangeProductAge !== null) {
            rangeProductAge.addEventListener("input", (event) => {
                const target = event.target as HTMLInputElement;
                product_age = parseInt(target.value);
            });
        }

        const rangeProductQuantity =
            document.getElementById("product_quantity");
        if (rangeProductQuantity !== null) {
            rangeProductQuantity.addEventListener("input", (event) => {
                const target = event.target as HTMLInputElement;
                product_quantity = parseInt(target.value);
            });
        }
    });
</script>

<pre>
    {JSON.stringify(form, null, 2)}
</pre>

<form method="POST" action="?/getLabel" use:enhance>
    <div class="grid">
        <!--Customer characteristics-->
        <div>
            <h4>Customer</h4>
            <label for="country"> Country </label>
            <select id="country" name="pais" required>
                <option value="" selected>Select a country</option>
                {#each countries as country}
                    <option value={country.value}>{country.name}</option>
                {/each}
            </select>
            <label for="age"
                >Age: {age}
                <input
                    type="range"
                    min="18"
                    max="100"
                    bind:value={age}
                    id="age"
                    name ="edad"
                />
            </label>
            <fieldset>
                <legend>Gender</legend>
                <label for="masculine">
                    <input
                        type="radio"
                        id="masculine"
                        name="sexo"
                        value="1"
                        checked
                    />
                    Masculine
                </label>
                <label for="femenine">
                    <input type="radio" id="femenine" name="sexo" value="2" />
                    Femenine
                </label>
            </fieldset>
            <label for="profession"> Profession </label>
            <select id="profession" name="profesion" required>
                <option value="" selected>Select a profession</option>
                {#each professions as profession}
                    <option value={profession.value}>{profession.name}</option>
                {/each}
            </select>
            <label for="salary">
                Salary
                <input
                    type="text"
                    id="salary"
                    name="salario"
                    placeholder="Salary"
                    bind:value={salary}
                    readonly
                />
            </label>
        </div>
        <!--Product characteristics-->
        <div>
            <h4>Product</h4>
            <label for="subcategory"> Subcategory </label>
            <select id="subcategory" name="subcategoria" required>
                <option value="" selected>Select a subcategory</option>
                {#each subcategories as subcategory}
                    <option value={subcategory.id}>{subcategory.id}</option>
                {/each}
            </select>
            <label for="product_age"
                >Product Age: {product_age}
                <input
                    type="range"
                    min="1"
                    max="100"
                    bind:value={product_age}
                    id="product_age"
                    name="edad_producto"
                />
            </label>
            <label for="height">
                Height
                <input
                    type="number"
                    id="height"
                    name="alto"
                    placeholder="Height"
                    step="0.01"
                    required
                />
            </label>
            <label for="width">
                Width
                <input
                    type="number"
                    id="width"
                    name="ancho"
                    placeholder="Width"
                    step="0.01"
                    required
                />
            </label>
            <label for="depth">
                Depth
                <input
                    type="number"
                    id="depth"
                    name="profundidad"
                    placeholder="Depth"
                    step="0.01"
                    required
                />
            </label>
            <fieldset>
                <label for="age_relevant">
                    <input type="checkbox" id="age_relevant" name="edad_relevante" role="switch" />
                    Age Relevant
                </label>
            </fieldset>
        </div>
        <div>
            <h4>Invoice Values</h4>
            <label for="product_quantity">
                Product quantity: {product_quantity}
                <input
                    type="range"
                    min="1"
                    max="5"
                    bind:value={product_quantity}
                    id="product_quantity"
                    name="cantidad_producto"
                />
            </label>
            <label for="unit_price">
                Unit price
                <input
                    type="number"
                    id="unit_price"
                    name="precio_unitario"
                    placeholder="Unit price"
                    step="0.01"
                    required
                />
            </label>
            <label for="iva">
                IVA
                <input
                    type="number"
                    id="iva"
                    name="iva"
                    placeholder="IVA"
                    step="0.01"
                    required
                />
            </label>
            <label for="subtotal">
                Subtotal
                <input
                    type="number"
                    id="subtotal"
                    name="subtotal"
                    placeholder="Subtotal"
                    step="0.01"
                    required
                />
            </label>
            <label for="total">
                Total
                <input
                    type="number"
                    id="total"
                    name="total"
                    placeholder="Total"
                    step="0.01"
                    required
                />
            </label>
            <label for="proffit">
                Proffit
                <input
                    type="number"
                    id="proffit"
                    name="ganancia"
                    placeholder="Proffit"
                    step="0.01"
                    required
                />
            </label>
        </div>
    </div>

    <!-- Button -->
    <button type="submit">Submit</button>
</form>
