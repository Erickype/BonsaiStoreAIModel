<script lang="ts">
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    // Customers
    const countries: { name: string; value: string }[] = [
        { name: "Ecuador", value: "21" },
        { name: "Colombia", value: "22" },
        { name: "United States", value: "23" },
        { name: "Sweden", value: "24" },
        { name: "United Kingdom", value: "25" },
    ];

    let selectedProfession = "";
    let salary = "";
    const professions: { name: string; salary: string; value: string }[] = [
        { name: "Business", salary: "1000", value: "1" },
        { name: "Engineer", salary: "1500", value: "2" },
        { name: "Firefighter", salary: "1000", value: "3" },
        { name: "Mechanic", salary: "2000", value: "4" },
        { name: "Policeman", salary: "900", value: "5" },
        { name: "Teacher", salary: "750", value: "6" },
    ];
    let age = 24;

    //Products
    const subcategories: { name: string; id: string }[] = [
        { name: "Moyogi", id: "2" },
        { name: "Fukinagashi", id: "3" },
        { name: "Kabudachi", id: "4" },
        { name: "Literati", id: "5" },
        { name: "Shakan", id: "6" },
        { name: "Ikadabuki", id: "7" },
        { name: "Han-Kengai", id: "8" },
        { name: "Yose-ue", id: "9" },
        { name: "Neagari", id: "10" },
        { name: "Ishitsuki", id: "11" },
        { name: "Akadama", id: "15" },
        { name: "Kiryuzuna", id: "16" },
        { name: "Kanuma", id: "17" },
        { name: "Sphagnum moss", id: "18" },
        { name: "Tierra para macetas", id: "19" },
        { name: "Piedra pómez", id: "20" },
        { name: "Perlita", id: "21" },
        { name: "Vermiculita", id: "22" },
        { name: "Tijeras de podar", id: "23" },
        { name: "Cizallas de hoja larga", id: "24" },
        { name: "Cizallas de yunque", id: "25" },
        { name: "Tijeras de defoliación", id: "26" },
        { name: "Pinzas de agarrar", id: "27" },
        { name: "Gancho de raíz", id: "28" },
        { name: "Cepillo de raíz", id: "29" },
        { name: "Cincel de raíz", id: "30" },
        { name: "Sierra", id: "31" },
        { name: "Alicate", id: "32" },
        { name: "Macetas de cerámica", id: "33" },
        { name: "Macetas de madera", id: "34" },
        { name: "Macetas de arcilla", id: "35" },
        { name: "Macetas de plástico", id: "36" },
        { name: "Macetas de vidrio", id: "37" },
        { name: "Macetas de metal", id: "38" },
    ];

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

    let checkboxValue = false;

    function handleCheckboxChange(event: Event) {
        const target = event.target as HTMLInputElement;
        checkboxValue = target.checked;
        if (checkboxValue) {
            target.value = "1";
        } else {
            target.value = "0";
        }
    }

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
                    min="24"
                    max="63"
                    bind:value={age}
                    id="age"
                    name="edad"
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
                    <option value={subcategory.id}>{subcategory.name}</option>
                {/each}
            </select>
            <label for="product_age"
                >Product Age: {product_age}
                <input
                    type="range"
                    min="2"
                    max="43"
                    bind:value={product_age}
                    id="product_age"
                    name="edad_producto"
                />
            </label>
            <label for="height">
                Height(cm)
                <input
                    type="number"
                    id="height"
                    name="alto"
                    placeholder="Height"
                    min="1"
                    required
                />
            </label>
            <label for="width">
                Width(cm)
                <input
                    type="number"
                    id="width"
                    name="ancho"
                    placeholder="Width"
                    min="1"
                    required
                />
            </label>
            <label for="depth">
                Depth(cm)
                <input
                    type="number"
                    id="depth"
                    name="profundidad"
                    placeholder="Depth"
                    min="0"
                    required
                />
            </label>
            <fieldset>
                <label for="age_relevant">
                    <input
                        type="checkbox"
                        id="age_relevant"
                        name="edad_relevante"
                        role="switch"
                        on:change={handleCheckboxChange}
                    />
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
                    min="5"
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
