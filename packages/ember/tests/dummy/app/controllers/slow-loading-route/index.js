import Controller from '@ember/controller';

export default class SlowLoadingRouteController extends Controller {
  slowLoadingTemplateOnlyItems = new Array(2000).fill(0).map((_, index) => index);
}
