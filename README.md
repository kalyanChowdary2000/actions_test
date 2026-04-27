# actions_test

Sample React app with a GitHub Actions workflow to SSH into EC2 and deploy in place.

## EC2 deploy workflow

Workflow file: `.github/workflows/deploy-ec2.yml`

It runs on:
- push to `main`
- manual trigger (`workflow_dispatch`)

### Required GitHub configuration

Add these in your GitHub repository settings:

- **Secret**: `EC2_SSH_PRIVATE_KEY`
  - Private key content used to SSH into your EC2 instance.
- **Secret**: `EC2_HOST`
  - Public DNS or public IP of EC2 (example: `ec2-xx-xx-xx-xx.compute-1.amazonaws.com`)
- **Secret**: `EC2_USER`
  - SSH user (usually `ubuntu` for Ubuntu AMI, `ec2-user` for Amazon Linux)
- **Secret**: `EC2_REPO_PATH`
  - Absolute path of the app repo on EC2 (example: `/root/test/actions_test`)
- **Secret**: `PM2_PROCESS_NAME`
  - PM2 process name or id to restart after build (example: `actions_test`)
- **Secret** (optional): `EC2_PORT`
  - SSH port (defaults to `22`)
- **Secret** (optional): `DEPLOY_BRANCH`
  - Git branch to deploy (defaults to `main`)

This workflow currently uses GitHub Environment name `production`. If your environment has a different name, update `environment:` in `.github/workflows/deploy-ec2.yml`.

### Notes

- Ensure the EC2 security group allows inbound SSH from GitHub Actions runners (or your accepted CIDR).
- The workflow SSHes as `EC2_USER` (for example `ubuntu`), runs `sudo -i`, then executes: `git pull`, `npm i`, `npm run build`, and `pm2 restart`.