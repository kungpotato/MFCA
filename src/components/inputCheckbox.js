import React from 'react'

const InputCheckbox = (props) => {
  const { item, isChecked, handleCheckboxClick } = props
  // const { isChecked } = this.state;

  return (
    <React.Fragment>
      <input
        type="checkbox"
        value={item}
        checked={isChecked}
        onChange={() => {}}
        onClick={handleCheckboxClick}
      />
      {/* {item.name} */}
    </React.Fragment>
  )
}

export default InputCheckbox
