import React from 'react'
import Sidebar from './Sidebar'
import styles from './AppLayout.module.css'
import Map from './Map'

const AppLayout = () => {
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
        </div>
    )
}

export default AppLayout