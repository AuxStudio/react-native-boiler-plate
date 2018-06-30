# Contributing

We work with a feature-based pull request workflow. Whenever you have some work to do:

```shell
git checkout master
git pull
git checkout -b "YOUR_NAME-FEATURE_NAME"
git push -u origin "YOUR_NAME-FEATURE_NAME"
```

Do some work.

```shell
git push
```

When you're done, create a pull request on github using the following [template](./PULL_REQUEST_TEMPLATE).

Once the PR has merged, the merger should delete the old feature branch:

```
git push -d origin FEATURE_BRANCH_NAME
git branch -d FEATURE_BRANCH_NAME
```

This workflow is quite new, so if you have any suggestions on how it can be improved, [shout](mailto:shaun@aux.co.za)!
