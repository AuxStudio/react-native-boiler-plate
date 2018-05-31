# Process

We work off of the `develop` branch and use a pull request work flow. Whenever you have some work to do:

```shell
git checkout develop
git pull
git checkout -b "YOUR_NAME-FEATURE_NAME"
```

Do some work.

```shell
git push -u origin YOUR_BRANCH_NAME
```

When you're done, create a pull request on github using the following [template](https://embeddedartistry.com/blog/2017/8/4/a-github-pull-request-template-for-your-projects).

Once the PR has merged, the merger should delete the old feature branch:

```
git push -d origin FEATURE_BRANCH_NAME
git branch -d FEATURE_BRANCH_NAME
```

This workflow is quite new, so if you have any suggestions on how it can be improved, [shout](mailto:shaun@aux.co.za)!
