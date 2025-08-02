// Debug script to test if our fixes are working
console.log('Debug script loaded');

// Test 1: Check if our modified functions exist
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, running tests...');
    
    // Test if updateBorders method exists
    setTimeout(() => {
        const generator = window.generator; // Assuming the instance is stored globally
        if (generator) {
            console.log('Generator found:', generator);
            console.log('updateBorders method exists:', typeof generator.updateBorders === 'function');
            console.log('updateIconColors method exists:', typeof generator.updateIconColors === 'function');
            console.log('updateCellColors method exists:', typeof generator.updateCellColors === 'function');
            
            // Test input element
            const input = document.getElementById('customIconColors');
            console.log('Custom colors input found:', !!input);
            console.log('Input disabled:', input?.disabled);
            console.log('Input readonly:', input?.readOnly);
            console.log('Input value:', input?.value);
            
            // Try to manually trigger input
            if (input) {
                input.focus();
                console.log('Input focused');
            }
        } else {
            console.log('Generator not found - checking window object:', Object.keys(window));
        }
    }, 1000);
});