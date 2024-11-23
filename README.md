# Project Title

This project is a file upload service that supports both local and AWS S3 storage. It provides functionalities to upload files publicly or privately, generate signed URLs, and convert private URLs to public URLs.

## Features

This file upload service offers a comprehensive set of features to cater to various file storage needs. Below are some of the key features:

1. **Dual Storage Support**: The service supports both local storage and AWS S3 storage, providing flexibility depending on your deployment environment and requirements.

2. **Public and Private Uploads**: You can upload files either publicly or privately. Public files are accessible via a public URL, while private files are stored securely and can only be accessed through signed URLs.

3. **Signed URLs**: Generate signed URLs for secure access to private files. This feature is particularly useful for providing temporary access to private files without exposing them publicly.

4. **URL Conversion**: Convert private URLs to public URLs seamlessly. This is useful when you need to change the access level of a file after it has been uploaded.

5. **Environment-Based Configuration**: The service is highly configurable through environment variables, allowing you to set up different configurations for different environments (e.g., development, staging, production).

6. **Error Handling**: Robust error handling mechanisms are in place to ensure that any issues during file upload or retrieval are properly managed and logged.

7. **Extensible Architecture**: The service is designed with extensibility in mind, allowing you to easily add new storage providers or modify existing ones to suit your needs.

8. **Utility Functions**: A set of utility functions are provided to handle common file operations such as reading, writing, and deleting files, as well as managing temporary file paths.

9. **Security**: The service includes security features such as secret keys for authentication and secure storage of sensitive information.

10. **Logging**: Comprehensive logging is implemented to track the status and errors of file operations, aiding in debugging and monitoring.

These features make the file upload service a versatile and reliable solution for managing file storage in various applications.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/file-upload-service.git
   cd file-upload-service
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the environment variables by copying `.env.template` to `.env` and filling in the required values:

   ```sh
   cp .env.template .env
   ```

4. Run the project:
   ```sh
   npm run dev
   ```

## Configuration

The following environment variables need to be set in the `.env` file:

- `BASE_URL`: The base URL of the server.
- `SERVER_AUTHENTICATION_SECRET`: Secret key for server authentication.
- `SERVER_DATABASE_URL`: URL for the database connection.
- `SERVER_OPENAI_API_KEY`: API key for OpenAI (if applicable).
- `SERVER_AUTHENTICATION_GOOGLE_CLIENT_ID`: Google client ID for authentication.
- `SERVER_AUTHENTICATION_GOOGLE_CLIENT_SECRET`: Google client secret for authentication.
- `SERVER_UPLOAD_AWS_REGION`: AWS region for S3.
- `SERVER_UPLOAD_AWS_ACCESS_KEY`: AWS access key for S3.
- `SERVER_UPLOAD_AWS_SECRET_KEY`: AWS secret key for S3.
- `SERVER_UPLOAD_AWS_BUCKET_PUBLIC_NAME`: Name of the public S3 bucket.
- `SERVER_UPLOAD_AWS_BUCKET_PRIVATE_NAME`: Name of the private S3 bucket.
- `SERVER_UPLOAD_MARBLISM_API_KEY`: API key for Marblism (if applicable).

## Usage

### Local Upload

To use the local upload provider, ensure the following paths are correctly set in `upload.provider.local.ts`:

- `pathPublicInternal`: Path for storing public files.
- `pathPrivateInternal`: Path for storing private files.
- `pathPublicExternal`: External URL path for public files.
- `pathPrivateExternal`: External URL path for private files.

### AWS S3 Upload

To use the AWS S3 upload provider, ensure the following environment variables are set:

- `SERVER_UPLOAD_AWS_REGION`
- `SERVER_UPLOAD_AWS_ACCESS_KEY`
- `SERVER_UPLOAD_AWS_SECRET_KEY`
- `SERVER_UPLOAD_AWS_BUCKET_PUBLIC_NAME`
- `SERVER_UPLOAD_AWS_BUCKET_PRIVATE_NAME`

### Example
