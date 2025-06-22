import React, { useState } from 'react';

const sections = [
    {
        key: 'carbon',
        title: 'Carbon',
        icon: '🟢', // replace with <Icon /> or svg
        content: (
            <>
                <h2>Carbon</h2>
                <p>
                    The science is clear. Significant carbon emission reductions are required to avoid the most severe effects of climate
                    change, restore biodiversity, protect vulnerable communities, and ensure a habitable planet for future generations.
                </p>
            </>
        )
    },
    {
        key: 'carbonFreeEnergy',
        title: 'Carbon-Free Energy',
        icon: '⚡',
        content: (
            <>
                <h2>Carbon-Free Energy</h2>
                <p>
                    Transitioning to carbon-free energy sources—including renewable energy sources such as wind and solar as well as other
                    sources such as nuclear power—is one of the most effective ways to lower Scope 2 emissions.
                </p>
            </>
        )
    },
    {
        key: 'packaging',
        title: 'Packaging',
        icon: '📦',
        content: (
            <>
                <h2>Packaging</h2>
                <p>
                    Our customers want right-sized, recyclable packaging that minimizes waste and ensures damage-free delivery.
                </p>
            </>
        )
    },
    // add more sections as needed
];

export default function ReportGreenSustainable() {
    const [activeKey, setActiveKey] = useState(sections[0].key);
    const activeSection = sections.find(sec => sec.key === activeKey);

    const containerStyle = {
        display: 'flex',
        width: '100%',
        minHeight: '500px',
        backgroundColor: '#f5fbf9',
    };

    const sidebarStyle = {
        width: '250px',
        borderRight: '1px solid #d0e3de',
        padding: '24px',
    };

    const itemStyle = isActive => ({
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        marginBottom: '8px',
        borderRadius: '24px',
        backgroundColor: isActive ? '#e3f7f0' : 'transparent',
        color: isActive ? '#006d5a' : '#01332b',
        cursor: 'pointer',
    });

    const contentStyle = {
        flex: 1,
        padding: '32px',
    };

    return (
        <div style={containerStyle}>
            <nav style={sidebarStyle}>
                {sections.map(sec => (
                    <div
                        key={sec.key}
                        style={itemStyle(sec.key === activeKey)}
                        onClick={() => setActiveKey(sec.key)}
                    >
                        <span style={{ marginRight: '12px' }}>{sec.icon}</span>
                        <span>{sec.title}</span>
                    </div>
                ))}
            </nav>

            <main style={contentStyle}>
                {activeSection.content}
            </main>
        </div>
    );
}
