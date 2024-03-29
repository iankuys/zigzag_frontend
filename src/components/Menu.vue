    <template>
        <div class="row">
            <div class="column">
                <div class="left-column">
                    <img alt="UCI MIND logo" class="logo" src="../assets/UCI16_MIND_Full_ctr_blue copy.png" width="417" height="87"/>
                    <div id="instructions_block">
                        <b>Enter a Patient ID in the box below, then select 1 to 3 visits per ZigZag</b>
                        <ul>
                            <li>
                                Click on column header to sort by visit number or year
                            </li>
                            <li>
                                <b>Display</b>: Fetches and displays latest ZigZag for the selected Patient ID and visits (<code>.pdf</code>)
                            </li>
                            <li>
                                <b>Download</b>: Downloads the latest ZigZag for the selected Patient ID and visits (Powerpoint <code>.pptm</code>)
                            </li>
                            <li>
                                <b>Clear</b>: Clears all selected visits
                            </li>
                        </ul>
                    </div>  
                    <div id="patient_selector">
                        <div class="form-group">
                            <label class="form-label">Patient ID: </label>
                            <input v-model="patientOption"
                            type="numeric"
                            list="dropdown"
                            class="form-control-sm p_input" 
                            />
                        </div>
                        <datalist class="mx-2" id="dropdown">
                            <option v-for="option in patientIds" :value="option">{{ option }}</option>
                        </datalist>
                    </div>
                    <div id="idnotfound" v-if="visitsArray.length == 0" 
                        ><i>Patient not found.</i></div>
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
            const years = ref([]);
            const combinedList = ref([]);
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
                    
                    // check if string is a number
                    if (/^[0-9]*$/.test(patientSelected.value) && patientSelected.value !== ""){

                        const url = `${host}/get_visits?p_id=${patientSelected.value}`;
                        const response = await fetch(url);
    
                        if (response.status === 200){
                            const data = await response.json();
        
                            visits.value = data["visits"];
                            years.value = data["years"];
                            combinedList.value = visits.value.map((value, index) => [value, years.value[index]]); // combine visits and years into one

                            visitsArray.value = combinedList.value.map(visit => ({ patient_id: patientSelected, visit:visit[0], year:visit[1] }));
                            isLoaded.value = true;
                        }
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
