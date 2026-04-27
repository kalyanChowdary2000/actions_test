# actions_test

Sample React app with a GitHub Actions workflow to deploy `dist/` to an AWS EC2 server.

## EC2 deploy workflow

Workflow file: `.github/workflows/deploy-ec2.yml`

It runs on:
- push to `main`
- manual trigger (`workflow_dispatch`)

### Required GitHub configuration

Add these in your GitHub repository settings:

- **Secret**: `EC2_SSH_PRIVATE_KEY`
  - Private key content used to SSH into your EC2 instance.
- **Variable**: `EC2_HOST`
  - Public DNS or public IP of EC2 (example: `ec2-xx-xx-xx-xx.compute-1.amazonaws.com`)
- **Variable**: `EC2_USER`
  - SSH user (usually `ubuntu` for Ubuntu AMI, `ec2-user` for Amazon Linux)
- **Variable**: `EC2_DEPLOY_PATH`
  - Target path on EC2 where static files are copied (example: `/var/www/actions_test`)
- **Variable** (optional): `EC2_PORT`
  - SSH port (defaults to `22`)

### Notes

- Ensure the EC2 security group allows inbound SSH from GitHub Actions runners (or your accepted CIDR).
- Ensure the EC2 user has permission to write into `EC2_DEPLOY_PATH`.
- This workflow uploads built static assets only. Serve that directory with Nginx/Apache/Caddy.