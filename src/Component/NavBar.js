import React from 'react'

export default function NavBar(props) {
  return (
    <div style={{textAlign:'center'}}>
        <h1>Liste des {props.nom}</h1>
    </div>
  )
}
