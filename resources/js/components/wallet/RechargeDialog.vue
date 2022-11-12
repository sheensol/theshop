<template>
    <v-dialog v-model="isVisible" max-width="700px" @click:outside="closeDialog">
        <div class="white pa-5 rounded">
            <v-form lazy-validation v-on:submit.prevent="rechargeWallet()" autocomplete="chrome-off">
                <h3 class="opacity-80 mb-3 fs-18">{{ $t('payment_options') }}</h3>
                <v-row class="mb-4">
                    <v-col  cols="6" sm="4" md="3" v-for="(paymentMethod, i) in paymentMethods" :key="i" :class="[paymentMethod.status == 1 && paymentMethod.code != 'cash_on_delivery' ? '' : 'd-none']">
                        <label class="aiz-megabox d-block">
                            <input type="radio" name="wallet_payment_method" :checked="paymentMethod.code == selectedPaymentMethod" @change="paymentSelected($event,paymentMethod.code)">
                            <span class="d-block pa-3 aiz-megabox-elem text-center">
                                <img :src="paymentMethod.img" class="img-fluid w-100">
                                <span class="fw-700 fs-13">{{ paymentMethod.name }}</span>
                            </span>
                        </label>
                    </v-col>
                </v-row>
                <h3 class="opacity-80 mb-3 fs-18">{{ $t('recharge_amount') }}</h3>
                <v-text-field
                    :placeholder="$t('amount')"
                    type="number"
                    v-model="rechargeAmount"
                    :error-messages="rechargeAmountErrors"
                    hide-details="auto"
                    required
                    outlined
                ></v-text-field>
                <div class="text-right mt-4">
                    <v-btn
                        text
                        @click="closeDialog"
                    >{{ $t('cancel') }}</v-btn>
                    <v-btn
                        elevation="0"
                        type="submit"
                        color="primary"
                        @click="rechargeWallet"
                        :loading="loading"
                        :disabled="loading"
                    >{{ $t('recharge_wallet') }}</v-btn>
                </div>
            </v-form>
            <Payment ref="makePayment" />
        </div>
    </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import Payment from "../payment/Payment"
export default {
    props: {
        from: { type: String, default: '/user/wallet' },
        show: { type: Boolean, required: true, default: false },
    },
    data: () => ({
        loading: false,
        selectedPaymentMethod: null,
        rechargeAmount: 1,
    }),
    validations: {
        rechargeAmount: { required },
    },
    components:{
        Payment
    },
    computed: {
        ...mapGetters("auth",["currentUser"]),
        ...mapGetters('app', ['paymentMethods']),
        isVisible: {
            get: function(){
                return this.show
            },
            set: function(newValue){}
        },
        rechargeAmountErrors() {
            const errors = [];
            if (!this.$v.rechargeAmount.$dirty) return errors;
            !this.$v.rechargeAmount.required &&
                errors.push(this.$i18n.t("this_field_is_required"));
            return errors;
        },
    },
    methods:{
        paymentSelected(event, paymentMethod){
            this.selectedPaymentMethod = paymentMethod
        },
        closeDialog(){
            this.isVisible = false
            this.$emit('close')
        },
        rechargeWallet(){
            
            if (!this.selectedPaymentMethod){
                this.snack({ message: this.$i18n.t("please_select_a_payment_method"), color: "red" });
                return
            }
            
            if (this.rechargeAmount < 1){
                this.snack({ message: this.$i18n.t("please_input_recharge_amount"), color: "red" });
                return
            }

            this.$v.rechargeAmount.$touch();
            if (this.$v.rechargeAmount.$anyError) {
                return;
            }
            this.loading = true;

            this.$refs.makePayment.pay({
                requestedFrom: this.from,
                paymentAmount: this.rechargeAmount,
                paymentMethod: this.selectedPaymentMethod,
                paymentType: 'wallet_payment',
                userId: this.currentUser.id,
                oderCode: null,
            })

        }
    }
}
</script>