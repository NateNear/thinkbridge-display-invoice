CREATE TABLE IF NOT EXISTS "Invoices" (
    "InvoiceID" INTEGER PRIMARY KEY,
    "CustomerName" TEXT
);

CREATE TABLE IF NOT EXISTS "InvoiceItems" (
    "ItemID" SERIAL PRIMARY KEY,
    "InvoiceID" INTEGER REFERENCES "Invoices"("InvoiceID"),
    "Name" TEXT NOT NULL,
    "Price" NUMERIC NOT NULL
);

INSERT INTO "Invoices" ("InvoiceID", "CustomerName")
VALUES (1, 'John Doe')
ON CONFLICT ("InvoiceID") DO NOTHING;

INSERT INTO "InvoiceItems" ("InvoiceID", "Name", "Price")
VALUES
    (1, 'Widget A', 19.99),
    (1, 'Service B', 45.00),
    (1, 'Gadget C', 12.50);
