# File Uploader API

## Overview

The File Uploader API is a backend service that allows users to upload Excel files containing company and contact data. It processes the uploaded files, validates the data, and stores the valid information in a MongoDB database. The API also provides endpoints for data confirmation and error handling.

## Features

- **File Upload**: Upload Excel files (.xls or .xlsx) with company and contact data.
- **Data Validation**: Validate the data in the uploaded file.
- **Data Review**: Preview the data in a table format before confirming the upload.
- **Confirmation Endpoint**: Confirm or cancel the data upload based on user review.
- **Error Handling**: Provide detailed error messages for invalid data.

## Setup

### Prerequisites

- Node.js (>=14.x)
- MongoDB (for database)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/file-uploader-api.git
   cd file-uploader-api
   ```

app link = https://fileuploader-api.vercel.app/
