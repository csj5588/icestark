const { DEPLOY_ENV } = process.env

module.exports = [
  {
    enable: false,
    name: 'https://xxx.inkept.cn/index',
    url: 'https://deploy.inkept.cn/templates/deploy.html?job_name=cop.inke_owt.bpc_pdl.opd_servicegroup.opd_service.admin_job.xxx-prod_cluster.ali-bj',
  },
  {
    enable: DEPLOY_ENV === 'gray',
    name: 'https://betaxxx.inkept.cn/index',
    url: 'https://deploy.inkept.cn/templates/deploy.html?job_name=cop.inke_owt.bpc_pdl.opd_servicegroup.opd_service.admin_job.xxx-prod_cluster.ali-gray',
  },
  {
    enable: DEPLOY_ENV === 'test',
    name: 'https://testxxx.inkept.cn/index',
    url: 'https://deploy.inkept.cn/templates/deploy.html?job_name=cop.inke_owt.bpc_pdl.opd_servicegroup.opd_service.admin_job.xxx-prod_cluster.ali-test',
  },
]
