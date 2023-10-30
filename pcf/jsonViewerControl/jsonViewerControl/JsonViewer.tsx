import React, { useState } from 'react';
import { IconButton } from '@fluentui/react/lib/Button'; // Import IconButton

interface TreeViewProps {
    data: any[];
}

interface TreeNodeProps {
  node: any;
  level: number;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, level }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };

  
const generateElement = (key : string, value: any, level:number) => {
  const paddingStyle = "32px";
  const displaySetting = isExpanded == true? "block": "none";
  const valueDataType = typeof value;
  return (    
    <div key={key} id={key} className="jsonLineItem" style={{ display: displaySetting, alignItems: "left", marginLeft: paddingStyle}}>
          <span className="attributeKey">{key}</span>: <span className={"attributeValue dataType"+valueDataType} >{value.toString()}</span>
        </div>  
  );
}
const generateChildElementArray = (key : string, items: any[], level:number) => {  
  const paddingStyle = "32px";
  const displaySetting = isExpanded == true? "block": "none";
  return ( 
    <div key={key} id={key} className="jsonLineItem" style={{ display: displaySetting, alignItems: "left", marginLeft: paddingStyle }}>
       <span className="attributeKey">{key}</span>: ({items.length})          
          {isExpanded == true?                         
            items.map((child) => (
              <TreeNodeComponent key={child} level={level+1} node={child} />
          ))
          : "" }
    </div>  
  );
}
const generateChildElementObject = (key : string, items: any, level:number) => {  
  const paddingStyle = "32px";
  const displaySetting = isExpanded == true? "block": "none";
  return ( 
    <div key={key} id={key} className="jsonLineItem" style={{ display: displaySetting, alignItems: "left", marginLeft: paddingStyle }}>
       <span className="attributeKey">{key}</span>:           
          {isExpanded == true?                                   
              <TreeNodeComponent key={items} level={level+1} node={items} />          
          : "" }
    </div>  
  );
}
function generateData(data:any, level: number) {
  const newData = Object.keys(data).reduce((result:any, currentKey) => {      
      if (typeof data[currentKey] === 'string' || data[currentKey] instanceof String
        || typeof data[currentKey] === 'number' || data[currentKey] instanceof Number
        || typeof data[currentKey] === 'boolean' || data[currentKey] instanceof Boolean) {
        const elementToPush = generateElement(currentKey, data[currentKey], level);
        result.push(elementToPush);
      } else if (data[currentKey] instanceof Array) {
        const childElement = [];
        const childElementElementHeader = generateChildElementArray(currentKey,data[currentKey], level);      
        childElement.push(childElementElementHeader);
        result.push(...childElement);
      }else {
        const childElement = [];
        const childElementElementHeader = generateChildElementObject(currentKey,data[currentKey], level);      
        childElement.push(childElementElementHeader);
        result.push(...childElement);
      }
    return result;
  }, []);
  return newData;
}

  return (
    <div>
      <div style={{textAlign: "left", clear: "both"}}>
        <IconButton
          iconProps={{ iconName: isExpanded ? 'BoxSubtractSolid' : 'BoxAdditionSolid' }}
          onClick={handleToggle}
          className='iconExpand'
          style={{ float:'left' }}
        /> 
        {isExpanded == true? generateData(node,level): <div className="jsonLineItem">[...]</div>}  
        </div>
         
    </div> 
  );
};

const TreeView: React.FC<TreeViewProps> = ({ data }) => (
  <div>
    {data.map((node) => (
      <TreeNodeComponent key={node} node={node} level={1} />
    ))}
  </div>
);

export default TreeView;