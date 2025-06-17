<template>
    <div class="modal fade" id="modalId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true" ref="modalElement">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal as BootstrapModal } from "bootstrap";

export default {
    name: "Modal",
    props: {
        modalId: { type: String, required: true },
        title: { type: String, default: "Modale" },
    },
    mounted() {
        this.modalInstance = new BootstrapModal(this.$refs.modalElement);
    },
    methods: {
        openModal() {
            this.modalInstance.show();
        },
        closeModal() {
            this.modalInstance.hide();
        },
    },
};
</script>