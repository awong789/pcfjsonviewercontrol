import React, { useState } from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button'; // Import Fluent UI PrimaryButton
import { IconButton } from '@fluentui/react/lib/Button'; // Import IconButton
import { Spinner } from '@fluentui/react/lib/Spinner'; // Import Spinner
import JsonViewer from './JsonViewer';
import { IInputs } from "./generated/ManifestTypes";

import './css/main.css';
import { error } from 'console';

export interface JsonVisualizerProps {
    context: ComponentFramework.Context<IInputs>;
}

const JsonVisualizer: React.FC<JsonVisualizerProps> = ({ context }) => {
    const [treeData, setTreeData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [errorMessage, setErrorMessage] = useState<string|null>(null); 

    const refreshJsonViewer = async () => {
        try {
            setIsLoading(true);
            setErrorMessage(null);
            let jsonData = context.parameters.jsonValue.raw == null? "":  JSON.parse(context.parameters.jsonValue.raw);
            let data =[];
            data.push(jsonData);
            setTreeData(data);
        } catch (error) {
            console.error('An error occured:', error)
            const errMsg: string = error as string;
            setErrorMessage(errMsg);
        } finally {
            setIsLoading(false); // Set isLoading to false after data is fetched
        }
    };


  refreshJsonViewer();

    return (
        <div className="jsonViewer">            
            {isLoading ? (
                <div className="spinner-overlay">
                    <Spinner label="Loading..." />
                </div>
            ) : (
                <PrimaryButton iconProps={{iconName:"Refresh"}} onClick={refreshJsonViewer}>Refresh</PrimaryButton>                
            )}     
            {errorMessage != null ? 
                <div className="error">ERROR occured: {errorMessage.toString()}</div>:  <JsonViewer data={treeData} />  }             
        </div>
    );
};

export default JsonVisualizer;