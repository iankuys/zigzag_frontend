    <template>
        <div class="row">
            <div class="column">
                <div class="left-column">
                    <div class="pt-5" id="patient_selector">
                        <div class="form-group mb-3">
                            <label class="form-label">Select a patient: </label>
                            <input v-model="patientOption"
                            list="dropdown"
                            class="form-control p_input" 
                            />
                        </div>
                        <datalist class="mx-2" id="dropdown">
                            <option v-for="option in patientIds" :value="option">{{ option }}</option>
                        </datalist>
                    </div>
                    <my-table v-if="visitsArray.length > 0 && isLoaded" 
                        :visitsArr="visitsArray" 
                        ></my-table>
                </div>    
            </div>
            <div class="column">    
                <div class="right-column">                    
                    <div id="iframe-container" hidden>
                        <iframe type="application/pdf" 
                        src= "" 
                        id="pdf-embed" > 
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    <script>
    import { inject, ref, onMounted, watch} from 'vue';
    import PatientTable from './PatientTable.vue';

    export default {
        setup() {
            const patientSelected = ref('');
            const patientIds = ref([]);
            const visitsArray = ref([]);
            const visits = ref([]);
            const isLoaded = ref(false);

            const host = inject('api_host');

            const fetchPatients = async () => {
                try {
                    const url = `${host}/get_patients`;
                    const response = await fetch(url);
                    const data = await response.json();
                    patientIds.value = data["patients"];
                } catch (error) {
                    console.error('Error fetching patients: ', error);
                }
            };

            const resetVisits = () => {
                visitsArray.value = [];
                isLoaded.value = false;

            };

            const fetchVisits = async () => {
                try {
                    resetVisits();

                    const url = `${host}/get_visits?p_id=${patientSelected.value}`;
                    const response = await fetch(url);

                    if (response.status === 200){
                        const data = await response.json();
    
                        visits.value = data["visits"];
                        visitsArray.value = visits.value.map(visit => ({ patient_id: patientSelected, visit }));
                        isLoaded.value = true;
                    }

                } catch (error) {
                    console.error('Error fetching visits: ', error);
                }
            };
            
            onMounted(fetchPatients);

            watch(patientSelected, async () => {
                await fetchVisits();
            });

            return {
                patientOption: patientSelected,
                patientIds,
                visitsArray,
                isLoaded,
                fetchVisits,
                fetchPatients
            };
        },
        components: {
            'my-table': PatientTable,
        },
    };
    </script>
