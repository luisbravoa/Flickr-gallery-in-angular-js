function FlickrCtrl ($scope, $routeParams, $location, Flickr) {

    $scope.photos = [];
    $scope.currentPhoto = null;
    $scope.prevPhoto = null;
    $scope.nextPhoto = null;
    $scope.currentPhotoSrc = '';
    $scope.text = '';
    $scope.modalOpened = null;
    $scope.search = function(search, page){
        $scope.loading = true;
        var promise = Flickr.search(search, page);
        promise.then(function(data) {
            $scope.photos = data.photos;
            $scope.photos = data.photos.photo;
            $scope.page = data.photos.page;
            $scope.pages = data.photos.pages;
            $scope.total = data.photos.total;
            $scope.paginator();
            $scope.loading = false;

        }, function(err) {
            console.log('Failed: ' + err);
            $scope.loading = false;
        });
    }
    $scope.selectPhoto = function(id){
        $('.photoModal').modal('hide');
        console.log('redirect: ' + id);
        $location.path( '/' + String(id) );
    }

    $scope.isModalOpened = function(){
        console.log($('.photoModal').hasClass('in'));
    }

    $scope.loading = true;

    $scope.paginator = function(){
        var self = this;
        var currentPage = $scope.page;
        var totalPages = $scope.pages;
        var pageNav = [];

        if(currentPage > 1){
            pageNav.push({text: '<< Back', number: currentPage - 1, current: false});
        }

        for(var i=1;i <= totalPages;i++){
            if(i==currentPage){
                if(currentPage==1){
                    pageNav.push({text: currentPage, number: currentPage, current: true});
                }
            }else{
                if(i >= currentPage - 4 && i < currentPage + 4 ){
                    pageNav.push({text: i, number: i, current: true});
                }
            }
        }
        if(currentPage < totalPages){
            pageNav.push({text: 'Next >>', number: (currentPage + 1), current: false});
        }
        $scope.pageNav = pageNav;
    }

    $scope.openModal = function(){
        var self = this;
        $('.photoModal').modal('show');
        if($scope.modalOpened) return;


        $('.photoModal').modal('show');
        $('.photoModal').on('hide.bs.modal', function (e) {
            $scope.modalOpened = false;
            $location.path('/');
        });
        $scope.modalOpened = true;
    },

    $scope.setCurrentPhoto = function(id){
        var currentIndex = 0;
        var currentPhoto = null
        angular.forEach($scope.photos, function(value, index){
            if (value.id == id){
                currentPhoto = value;
                currentIndex = parseInt(index);
                return;
            }
        });
        $scope.currentPhoto = (currentPhoto)? currentPhoto  : null ;
        $scope.prevPhoto = (currentIndex -1 >= 0)? $scope.photos[currentIndex - 1]  : null ;
        $scope.nextPhoto = ((currentIndex + 1) <= $scope.photos.length)? $scope.photos[currentIndex + 1]  : null ;
        $scope.currentPhotoSrc = (currentPhoto)?'http://farm' + $scope.currentPhoto.farm + '.static.flickr.com/' + $scope.currentPhoto.server + '/' + $scope.currentPhoto.id + '_' + $scope.currentPhoto.secret + '_z.jpg' : null;
    }

    $scope.search();

}