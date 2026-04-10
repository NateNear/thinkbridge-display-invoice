document.addEventListener('DOMContentLoaded', function() {
    const toMoneyNumber = (value) => {
        const n = Number(value);
        return Number.isFinite(n) ? n : 0;
    };

    fetch('/api/invoice')
        .then(async (resp) => {
            const data = await resp.json();
            if (!resp.ok) {
                throw new Error(data?.error || 'Failed to load invoice data');
            }
            return data;
        })
        .then(data => {
            const items = Array.isArray(data?.items) ? data.items : [];
            let html = '<table><thead><tr><th>Item</th><th>Price</th></tr></thead><tbody>';
            let total = 0;
            items.forEach(item => {
                const price = toMoneyNumber(item.price);
                html += `<tr><td>${item.name}</td><td class="price">$${price.toFixed(2)}</td></tr>`;
                total += price;
            });
            html += `
                <tr class="total-row">
                    <td>Total</td>
                    <td class="price">$${total.toFixed(2)}</td>
                </tr>
            </tbody></table>
            <div style="text-align: center; margin-top: 20px;">
                <button id="add-item-btn">Add New Item</button>
            </div>
            `;
            document.getElementById('invoice-container').innerHTML = html;

            // Modal Logic
            const modal = document.getElementById("add-item-modal");
            const btn = document.getElementById("add-item-btn");
            const span = document.getElementsByClassName("close")[0];
            const saveBtn = document.getElementById("save-item-btn");

            btn.onclick = function() {
                modal.style.display = "block";
            }

            span.onclick = function() {
                modal.style.display = "none";
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

            saveBtn.onclick = function() {
                const name = document.getElementById("new-item-name").value;
                const price = document.getElementById("new-item-price").value;

                if(name && price) {
                    fetch('/api/invoice/items', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name: name, price: parseFloat(price) }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        modal.style.display = "none";
                        
                        // Dynamic DOM Update (No Reload)
                        const tableBody = document.querySelector("#invoice-container tbody");
                        const totalRow = document.querySelector(".total-row");
                        
                        // Create new row
                        const newPrice = toMoneyNumber(data.price);
                        const newRow = document.createElement("tr");
                        newRow.innerHTML = `<td>${data.name}</td><td class="price">$${newPrice.toFixed(2)}</td>`;
                        
                        // Insert before total row
                        tableBody.insertBefore(newRow, totalRow);

                        // Update Total
                        const currentTotalText = totalRow.querySelector(".price").innerText.replace('$', '');
                        const currentTotal = parseFloat(currentTotalText);
                        const newTotal = currentTotal + newPrice;
                        totalRow.querySelector(".price").innerText = `$${newTotal.toFixed(2)}`;

                        // Clear inputs
                        document.getElementById("new-item-name").value = "";
                        document.getElementById("new-item-price").value = "";
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                } else {
                    alert("Please enter both name and price");
                }
            }

        })
        .catch(error => {
            console.error("Failed to load invoice:", error);
            document.getElementById('invoice-container').innerHTML =
                '<p style="color:#b91c1c;text-align:center;">Failed to load invoice data. Check API/database connection.</p>';
        });

    document.getElementById('download-btn').addEventListener('click', () => {
        window.print();
    });
});
