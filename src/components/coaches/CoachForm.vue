<script setup>
import { useCoachesStore } from "@/stores/coaches";
import { reactive, ref } from "vue";

const firstname = reactive({
  val: "",
  isValid: true,
});
const lastname = reactive({
  val: "",
  isValid: true,
});
const description = reactive({
  val: "",
  isValid: true,
});
const rate = reactive({
  val: null,
  isValid: true,
});
const areas = reactive({
  val: [],
  isValid: true,
});

const formIsValid = ref(true);

const { registerCoach } = useCoachesStore();

function validateForm() {
  formIsValid.value = true;
  if (firstname.val.length === 0) {
    firstname.isValid = false;
    formIsValid.value = false;
  }
  if (lastname.val.length === 0) {
    lastname.isValid = false;
    formIsValid.value = false;
  }
  if (description.val.length === 0) {
    description.isValid = false;
    formIsValid.value = false;
  }
  if (description.val.length === 0) {
    description.isValid = false;
    formIsValid.value = false;
  }
  if (!rate.val || rate.val <= 0) {
    rate.isValid = false;
    formIsValid.value = false;
  }
  if (areas.val.length === 0) {
    console.log(areas.val);
    areas.isValid = false;
    formIsValid.value = false;
  }
}

function clearValidity(input) {
  input.isValid = true;
}

function submitForm() {
  validateForm();

  if (!formIsValid.value) {
    return;
  }

  const formData = {
    first: firstname.val,
    last: lastname.val,
    desc: description.val,
    rate: rate.val,
    areas: areas.val,
  };

  registerCoach(formData);
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstname.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstname.val"
        @blur="clearValidity(firstname)"
      />
      <p v-if="!firstname.isValid">Firstname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastname.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastname.val"
        @blur="clearValidity(lastname)"
      />
      <p v-if="!lastname.isValid">Lastname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity(description)"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.val"
        @blur="clearValidity(rate)"
      />
      <p v-if="!description.isValid">Rate must be greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <label>
        <h3>Areas of Expertise</h3>
      </label>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearValidity(areas)"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearValidity(areas)"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearValidity(areas)"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">At least one area of expertise must be chosen</p>
    </div>
    <p v-if="!formIsValid" class="error">
      Invalid Input: Please fix the errors before registering.
    </p>
    <base-button>Register</base-button>
  </form>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid p {
  font-size: 12px;
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.error {
  font-size: 24px;
  font-weight: bold;
  color: red;
}
</style>
