<template>
  <div class="reset-password-container">
    <div>
      <h2 class="mb-5">{{$t("resetPassword")}}</h2>
      <p class="text-muted mb-3">{{$t("resetPasswordTitle")}}</p>
      <div class="form-group">
        <label for="txb-email">{{$t("email")}}</label>
        <input
          type="email"
          class="form-control"
          :class="{'form-control-has-error': emailNotFound}"
          id="txb-email"
          v-model="email"
          dir="ltr"
        >
        <div v-if="emailNotFound" class="error-message">{{$t("emailNotFound")}}</div>
      </div>
      <div>
        <button class="btn btn-block btn-primary" @click="resetPassword">{{$t("send")}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { userService } from "../services/users-service.js";
import SimpleVueValidation from "simple-vue-validator";

export default {
  name: "reset-password",
  data: function() {
    return {
      email: "",
      emailNotFound: false
    };
  },
  methods: {
    resetPassword: function() {
      userService
        .resetPassword(this.email)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status == 403) {
            this.emailNotFound = true;
          }
        });
    }
  }
};
</script>

<style scoped>
.reset-password-container {
  text-align: center;
  font-weight: 600;
  margin: auto;
  width: 500px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
}

.reset-password-container > div {
  padding: 20px;
}

h2 {
  font-size: 35px;
  font-weight: 600;
}
</style>


