<template>
    <div>
        <ag-grid-vue id="patient_table" class="ag-theme-alpine"  style="height: 500px; width: 100%" :columnDefs="columnDefs" :rowData="rowData.value"
            rowSelection="multiple" :rowMultiSelectWithClick="true" animateRows="true"
            @selection-changed="onSelectionChanged" @grid-ready="onGridReady">
        </ag-grid-vue>
        <div id="button_container">
            <button type="button" class="btn btn-primary float-left" @click="fetchZigZag">Display</button>
            <button type="button" class="btn btn-primary float-right" @click="fetchPPT">Download</button>
        </div>  
    </div>
</template>
  
<script>
import { ref, inject, onMounted, defineEmits } from 'vue';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';

export default {
    props: {
        visitsArr: Array,
    },

    setup(props) {
        const width = ref(0)
        const columnDefs = ref([
            { field: 'patient_id'},
            { field: 'visit' },
        ]);
        const gridApi = ref(null);
        const gridColumnApi = ref(null);
        const defaultColDef = ref({
            flex: 1,
            minWidth: 100,
        });
        const patientId = ref("")
        const rowData = ref({});
        const visitsSelected = ref([]);
        const host = inject('api_host')
        const iframeElement = document.getElementById("iframe-container");
        
        const fetchZigZag = async () => {
            document.querySelector("iframe").src = "";
            const endpoint = "get_zigzag";
            downloadFiles(endpoint); 
            iframeElement.removeAttribute("hidden"); 
        };

        const fetchPPT = async () => {
            const endpoint = "get_ppt";
            downloadFiles(endpoint);
        };

        const downloadFiles = async (endpoint) => {
            if (visitsSelected.value.length <= 3 && visitsSelected.value.length > 0){

                try {
                    const url = `${host}/${endpoint}`;

                    const data = {
                        p_id: patientId.value,
                        visits: visitsSelected.value,
                    }

                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // Add any other headers if needed
                        },
                        body: JSON.stringify(data),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const responseData = await response.blob();

                    // To get file name from Content-Disposition
                    const content_disposition = response.headers.get("Content-Disposition")
                    var filename = "";

                    if (content_disposition !== undefined){
                        filename = content_disposition.split('filename=')[1].replace(/['"]+/g, '');
                    } else{
                        console.log("Filename not found in the response headers.")
                    }
                    // Create a URL for the blob
                    const download_url = window.URL.createObjectURL(responseData);
                    
                    if (endpoint === "get_zigzag"){
                        document.querySelector("iframe").src = download_url;
                    } else {
                        // Create a temporary <a> element
                        const a = document.createElement('a');
                        a.href = download_url;
                        a.download = filename; 
                        document.body.appendChild(a);
    
                        // Initiate the download
                        a.click();
                        // Clean up
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                    }

                } catch (error) {
                    console.error('Error fetching zigzag: ', error);
                }
            } else {
                alert("Please select more than 0 but less than 3 entries for ZigZag");
            }
            
        }

        // const updateIFrame = (url_name) => {
        //     document.querySelector("iframe").src = url_name;
        // }

        const onGridReady = (params) => {
            gridApi.value = params.api;
            gridColumnApi.value = params.columnApi;
            patientId.value = props.visitsArr[0].patient_id;
            gridApi.value.setRowData(props.visitsArr);
        };

        onMounted(() => {
            width.value = document.getElementById('patient_table').offsetWidth;
            window.addEventListener("resize", resizeHandler);
            
            columnDefs.value.forEach((column) => {
                column.width = (width.value - 2) / 2;
            });

        })

        const onSelectionChanged = () => {

            var selectedNodes = gridApi.value.getSelectedNodes();
            var selectedRowsArr = [];
            var maxToZigZag = 3;
            selectedNodes.forEach(function (selectedNode) {
                if (visitsSelected.value.length >= maxToZigZag && !visitsSelected.value.includes(selectedNode.data.visit)) {
                    selectedNode.setSelected(false);
                } else {
                    selectedRowsArr.push(selectedNode.data.visit);
                }
                
            });
            visitsSelected.value = selectedRowsArr;
        };

        const resizeHandler = () => { 
            width.value = document.getElementById('patient_table').offsetWidth;
            
            console.log("windows size changed")
            columnDefs.value.forEach((column) => {
                column.width = (width.value - 2) / 2;
            });
        }

        return {
            columnDefs,
            gridApi,
            gridColumnApi,
            defaultColDef,
            rowData,
            visitsSelected,
            onGridReady,
            onSelectionChanged,
            deselectRows: () => {
                gridApi.value.deselectAll()
            },
            fetchZigZag,
            fetchPPT,
            resizeHandler
        };
    },
    components: {
        AgGridVue,
    },
};
</script>
  